// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PatientRecordsContract is Ownable {
    struct Record {
        string ipfsHash;
        bool isActive;
    }

    mapping(uint256 => Record) public patientRecords;  // patientId to Record
    mapping(uint256 => mapping(address => bool)) public accessAllowed;  // patientId to (doctorAddress to access status)

    function addRecord(uint256 patientId, string memory ipfsHash) public onlyOwner {
        patientRecords[patientId] = Record(ipfsHash, true);
    }

    function grantAccess(uint256 patientId, address doctor) public onlyOwner {
        accessAllowed[patientId][doctor] = true;
    }

    function revokeAccess(uint256 patientId, address doctor) public onlyOwner {
        accessAllowed[patientId][doctor] = false;
    }

    function getRecord(uint256 patientId) public view returns (string memory) {
        require(accessAllowed[patientId][msg.sender] == true, "Access not allowed");
        require(patientRecords[patientId].isActive, "No active record found");
        return patientRecords[patientId].ipfsHash;
    }
}
