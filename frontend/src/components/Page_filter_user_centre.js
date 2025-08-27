import axios from 'axios';
import { useEffect, useState } from 'react';

import User_single_card from './User_single_card.js';
import User_edit_modal from './User_edit_modal.js';
import Capstone_config from '../config/Capstone_config.js';

const config = Capstone_config();
const userAllEP = config.userAllEP;
const userDeleteEP = config.userDeleteEP;

export default function Page_filter_user_centre(props) {

    const [userDetails, setUserDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('jwtToken');
            console.log('Loading users with token:', token ? 'Token exists' : 'No token');
            console.log('Token value:', token);
            
            const response = await axios.get(userAllEP, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Users loaded successfully:', response.data);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
            console.error('Error response:', error.response);
            setUserDetails([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (user) => {
        console.log('handleEdit called with user:', user);
        setSelectedUser(user);
        setEditModalOpen(true);
        console.log('Modal should now be open:', true);
    };

    const handleDelete = async (userid, userName) => {
        console.log('handleDelete called with userid:', userid, 'userName:', userName);
        if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            try {
                const token = localStorage.getItem('jwtToken');
                console.log('Attempting to delete user with token:', token ? 'Token exists' : 'No token');
                await axios.delete(userDeleteEP, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: { userid }
                });
                
                // Refresh the user list
                await loadUsers();
                alert(`User "${userName}" deleted successfully`);
            } catch (error) {
                console.error('Error deleting user:', error);
                alert(error.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    const handleUpdate = () => {
        loadUsers(); // Refresh the list after update
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-4 mt-3 px-2 ms-auto">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Actions</h6>
                            <div className="row my-3 d-grid px-2">
                               <button
                                    className="btn btn-primary"
                                    onClick={loadUsers}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Refresh Users'}
                                </button>                                
                            </div>
                            <div className="row my-3 d-grid px-2">
                               <button
                                    className="btn btn-success"
                                    onClick={() => window.location.href = '/#/registeruser'}
                                >
                                    Add New User
                                </button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-2">
                <div className="alert alert-warning text-center mt-4 fw-bold" role="alert">
                    User Entries
                </div>
                <div className="container">
                    {isLoading ? (
                        <div className="text-center my-4">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row mt-2 mb-4">
                            {userDetails.map(function (listItem, index) {
                                return (
                                    <User_single_card 
                                        key={listItem.userid}
                                        item={listItem}
                                        listIndex={index}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    ></User_single_card>
                                );
                            })}
                        </div>
                    )}
                </div>                                 
            </div>

            <User_edit_modal
                user={selectedUser}
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedUser(null);
                }}
                onUpdate={handleUpdate}
            />
        </div>
    );
}