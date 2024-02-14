// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NetworkMapper is Ownable {
    mapping(string => address) public contractAddresses;

    mapping(address => string) public NGOToNetworkMapping; // maps each NGO to a particular network, used to authenticate and route the NGO to their chain-specific contract

    // location parameter for both ngo and user to match

    enum networks {
        filecoinHyperspace,
        gnosis,
        scroll,
        optimism
    }

    networks lastNetAssigned;

    struct activityPointers {
        address activityHomeNetwork;
        uint128 eventID;
        address activitySourceNGO;
        string lastDateForActivity;
    }

    struct userMetadata {
        string name;
        uint256 balance;
        string location;
        uint8 age;
    }

    mapping(address => activityPointers[]) listOfRegisteredActivitiesForEachUser;

    mapping(address => userMetadata) public userMapping; // user metadata for auth and verification

    constructor(address[] memory _contractAddresses) {
        // defining enum for last network
        lastNetAssigned = networks.filecoinHyperspace;
        // 0 is filecoinHyperspace
        contractAddresses["filecoinHyperspace"] = _contractAddresses[0];
        // 1 is gnosis
        contractAddresses["gnosis"] = _contractAddresses[1];
        // 2 is scroll
        contractAddresses["scroll"] = _contractAddresses[2];
        // 3 is optimism
        contractAddresses["optimism"] = _contractAddresses[3];
    }

    function getNewNetwork () public returns (networks){
        networks currentNetwork =  lastNetAssigned;
        if ( uint(currentNetwork) == 3 )
        {
            lastNetAssigned = (networks.filecoinHyperspace);
        } else {
            lastNetAssigned = networks((uint256(lastNetAssigned)) + 1);
        }
        return currentNetwork;
    }

    function changeAddressOfContract(
        string memory _networkName,
        address _contractAddress
    ) public onlyOwner {
        contractAddresses[_networkName] = _contractAddress;
    }

    function setNGONetworkMapping(
        string memory _networkName,
        address _NGOAddress
    ) public onlyOwner {
        NGOToNetworkMapping[_NGOAddress] = _networkName;
    }

    function setUserMapping(
        string memory _name,
        uint8 _age,
        uint256 _balance,
        string memory _location,
        address _userAddress
    ) public onlyOwner {
        userMapping[_userAddress] = userMetadata(
            _name,
            _balance,
            _location,
            _age
        );
    }

    function addActivityForUser(
       address _activityHomeNetwork,
        uint128 _eventID,
        address _activitySourceNGO,
        string memory _lastDateForActivity,
        address _userAddress
    ) public onlyOwner {
        activityPointers memory temp = activityPointers(_activityHomeNetwork,_eventID,_activitySourceNGO, _lastDateForActivity );
        listOfRegisteredActivitiesForEachUser[_userAddress].push(temp);
    }
}

