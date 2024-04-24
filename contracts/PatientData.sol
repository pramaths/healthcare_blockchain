// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract PatientData {
    mapping(address => string[]) private healthRecords;

    event RecordAdded(address indexed patient, string ipfsHash);

    function addHealthRecord(string memory ipfsHash) public {
        healthRecords[msg.sender].push(ipfsHash);
        emit RecordAdded(msg.sender, ipfsHash);
    }

    function getHealthRecords() public view returns (string[] memory) {
        return healthRecords[msg.sender];
    }
}
