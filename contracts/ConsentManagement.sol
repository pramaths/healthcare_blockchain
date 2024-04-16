// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ConsentManagement {
    mapping(uint256 => mapping(address => bool)) public consents; // patientId to (entityAddress to consent status)

    function giveConsent(uint256 patientId, address entity) public {
        consents[patientId][entity] = true;
    }

    function revokeConsent(uint256 patientId, address entity) public {
        consents[patientId][entity] = false;
    }

    function checkConsent(uint256 patientId, address entity) public view returns (bool) {
        return consents[patientId][entity];
    }
}
