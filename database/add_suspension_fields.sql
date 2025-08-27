-- Add suspension fields to user table
-- Run this script to update your existing database

ALTER TABLE user 
ADD COLUMN suspension_status ENUM('Active', 'Suspended') DEFAULT 'Active',
ADD COLUMN suspension_reason VARCHAR(100) DEFAULT NULL;

-- Update existing users to have 'Active' status
UPDATE user SET suspension_status = 'Active' WHERE suspension_status IS NULL;

-- Optional: Add some test suspension data
-- UPDATE user SET suspension_status = 'Suspended', suspension_reason = 'Inactive' WHERE userid = 1;
