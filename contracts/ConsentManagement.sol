// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ConsentManagement {
    mapping(address => mapping(address => bool)) public consentGiven;

    event ConsentUpdated(address indexed patient, address indexed viewer, bool consentStatus);

    function giveConsent(address viewer) public {
        consentGiven[msg.sender][viewer] = true;
        emit ConsentUpdated(msg.sender, viewer, true);
    }

    function revokeConsent(address viewer) public {
        consentGiven[msg.sender][viewer] = false;
        emit ConsentUpdated(msg.sender, viewer, false);
    }

    function checkConsent(address patient, address viewer) public view returns (bool) {
        return consentGiven[patient][viewer];
    }
}
