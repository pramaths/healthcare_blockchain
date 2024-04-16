// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract AuditTrailContract {
    event RecordAccessed(uint256 indexed patientId, address indexed accessedBy, uint256 timestamp);
    event RecordUpdated(uint256 indexed patientId, address indexed updatedBy, uint256 timestamp);

    function logAccess(uint256 patientId) public {
        emit RecordAccessed(patientId, msg.sender, block.timestamp);
    }

    function logUpdate(uint256 patientId) public {
        emit RecordUpdated(patientId, msg.sender, block.timestamp);
    }
}
