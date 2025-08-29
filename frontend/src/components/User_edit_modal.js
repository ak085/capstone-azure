import { useState, useEffect } from 'react';
import axios from 'axios';
import Capstone_config from '../config/Capstone_config.js';

const config = Capstone_config();
const userUpdateEP = config.userUpdateEP;

export default function User_edit_modal({ user, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        userid: '',
        name: '',
        email: '',
        role: '',
        suspension_status: 'Active',
        suspension_reason: ''
    });
    const [passwordData, setPasswordData] = useState({
        changePassword: false,
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                userid: user.userid,
                name: user.name,
                email: user.email,
                role: user.role,
                suspension_status: user.suspension_status || 'Active',
                suspension_reason: user.suspension_reason || ''
            });
            // Reset password fields when user changes
            setPasswordData({
                changePassword: false,
                newPassword: '',
                confirmPassword: ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Password validation
        if (passwordData.changePassword) {
            if (passwordData.newPassword.trim().length === 0) {
                setError('Password cannot be empty');
                setIsLoading(false);
                return;
            }
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                setError('Passwords do not match');
                setIsLoading(false);
                return;
            }
        }

        try {
            const token = localStorage.getItem('jwtToken');
            
            // Prepare update data
            const updateData = { ...formData };
            if (passwordData.changePassword) {
                updateData.password = passwordData.newPassword;
            }

            const response = await axios.put(userUpdateEP, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                onUpdate();
                onClose();
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.response?.data?.message || 'Failed to update user');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Modal Backdrop */}
            <div 
                className="position-fixed w-100 h-100" 
                style={{ 
                    top: 0, 
                    left: 0, 
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    zIndex: 1040 
                }}
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div 
                className="position-fixed" 
                style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 1050,
                    minWidth: '400px'
                }}
            >
                <div className="card shadow-lg">
                    <div className="card-header bg-primary text-white">
                        <h5 className="card-title mb-0">Edit User</h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white position-absolute" 
                            style={{ top: '10px', right: '10px' }}
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <div className="mb-3">
                                <label className="form-label">User ID</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={formData.userid} 
                                    disabled 
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                    maxLength="50"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                    maxLength="100"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select 
                                    className="form-select"
                                    value={formData.role}
                                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                    required
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Member">Member</option>
                                </select>
                            </div>

                            {/* Suspension Status Section */}
                            <div className="mb-3">
                                <label className="form-label">Account Status</label>
                                <select 
                                    className="form-select"
                                    value={formData.suspension_status}
                                    onChange={(e) => setFormData(prev => ({ 
                                        ...prev, 
                                        suspension_status: e.target.value,
                                        suspension_reason: e.target.value === 'Active' ? '' : formData.suspension_reason
                                    }))}
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                            </div>

                            {formData.suspension_status === 'Suspended' && (
                                <div className="mb-3">
                                    <label className="form-label">Suspension Reason</label>
                                    <select 
                                        className="form-select"
                                        value={formData.suspension_reason}
                                        onChange={(e) => setFormData(prev => ({ ...prev, suspension_reason: e.target.value }))}
                                        required
                                    >
                                        <option value="">Select a reason</option>
                                        <option value="Violation">Violation</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Requested">Requested</option>
                                    </select>
                                </div>
                            )}

                            {/* Password Change Section */}
                            <div className="mb-3">
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="changePasswordCheck"
                                        checked={passwordData.changePassword}
                                        onChange={(e) => setPasswordData(prev => ({ 
                                            ...prev, 
                                            changePassword: e.target.checked,
                                            newPassword: '',
                                            confirmPassword: ''
                                        }))}
                                    />
                                    <label className="form-check-label" htmlFor="changePasswordCheck">
                                        Change Password
                                    </label>
                                </div>
                            </div>

                            {passwordData.changePassword && (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">New Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </>
                            )}
                            
                            <div className="d-flex justify-content-end gap-2">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
