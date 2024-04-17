// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract PatientRecordsContract is AccessControl {
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
    struct Record {
        string ipfsHash;            // IPFS hash of the encrypted PDF
        string encryptionKey;       // Encrypted symmetric key (for decryption)
        bool isActive;
    }

    mapping(uint256 => Record) public patientRecords;
    mapping(uint256 => mapping(address => bool)) public accessAllowed;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addRecord(uint256 patientId, string memory ipfsHash, string memory encryptedKey) public onlyRole(PATIENT_ROLE) {
        patientRecords[patientId] = Record(ipfsHash, encryptedKey, true);
    }

    function grantAccess(uint256 patientId, address user, string memory encryptedKey) public onlyRole(PATIENT_ROLE) {
        accessAllowed[patientId][user] = true;
        patientRecords[patientId].encryptionKey = encryptedKey;
    }

    function revokeAccess(uint256 patientId, address user) public onlyRole(PATIENT_ROLE) {
        accessAllowed[patientId][user] = false;
    }

    function getRecord(uint256 patientId) public view returns (string memory, string memory) {
        require(accessAllowed[patientId][msg.sender], "Access not allowed");
        require(patientRecords[patientId].isActive, "No active record found");
        return (patientRecords[patientId].ipfsHash, patientRecords[patientId].encryptionKey);
    }
}
