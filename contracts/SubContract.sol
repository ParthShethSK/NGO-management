// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {HyperlaneConnectionClient} from "@hyperlane-xyz/core/contracts/HyperlaneConnectionClient.sol";

contract SubContract is HyperlaneConnectionClient {

    // events that NGOs have can be of two types
    enum typeOfEvent {
        shortTermEvent, // 1 or 2 day event
        longTermEvent // usually week or month long
    }

    mapping(address => mapping(uint16 => uint8)) listOfVolunteerHashes; // each volunteer (address), for a particular event is assigned a hash

    // add a short activity for a NGO
    function addActivity( string memory _name, string memory _shiftStartTime , string memory _shiftEndTime , string memory _startDate, string memory _endDate, string memory _location, address _NGOAddress ) public {          
        uint128 currentCounter = listOfNGOs[_NGOAddress].lastEventCounter; // free index
        // set all event metadata
        listOfNGOs[_NGOAddress].eventName[currentCounter] = _name;
        listOfNGOs[_NGOAddress].eventLocation[currentCounter] = _location;
        listOfNGOs[_NGOAddress].shiftStartTime[currentCounter] = _shiftStartTime;
        listOfNGOs[_NGOAddress].shiftEndTime[currentCounter] = _shiftEndTime;
        listOfNGOs[_NGOAddress].startDate[currentCounter] = _startDate;
        listOfNGOs[_NGOAddress].endDate[currentCounter] = _endDate;
        // increment counter
        updateEventCounterForNGO(_NGOAddress);
    }
    
    // get activities for a NGO
    function getActivities(address _NGOAddress) public view returns(NGODetails memory) {
        // check if candidate exists
        return (listOfNGOs[_NGOAddress]);
    }
    
    // addVolunteersToAnEventIDForANGO
    function addVolunteersToAnEventIDForANGO(address _NGOAddress, uint128 _eventID, address _volunteerAddress) public {
        // check if candidate exists
        volunteersListForEventIDForANGO[_NGOAddress][_eventID].push(_volunteerAddress);
    }

    
     mapping(address => mapping(uint128 => address[])) volunteersListForEventIDForANGO;
  
    
    // each NGO has some metadata, like the owner address and the list of activities they have
    struct NGODetails {
        string name;
        string location;
        // stuff from the activity struct
        string[] eventName; // name of the event
        string[] eventLocation; 
        string[] shiftStartTime; // when the shift starts, volunteer clocks in
        string[] shiftEndTime; // when the shift ends, volunteer clocks out, or gets auto-clocked out
        string[] startDate;
        string[] endDate;
         // say max volunteers per event is 15
        uint128 lastEventCounter; // doubles as eventID
    }

    mapping(address => NGODetails) public listOfNGOs; // each NGO (owner address) is mapped to their own metadata and list of events

    // helper function for hyperlane mailbox
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    // to send NGOMappingToMainContract through hyperlane
    function relayNGOMappingToMainContract(
        uint32 _destination,
        address _recipient,
        address _NGOAddress
    ) external {
        // so that the main contract can keep track of where each NGO is, i.e, which chain some particular NGO's information is
        bytes memory _message = abi.encodePacked(_NGOAddress);
        mailbox.dispatch(_destination, addressToBytes32(_recipient), _message);
    }

    // to add or set NGO data
    function setNGOToContract(
        string memory _name,
        string memory _location,
        address _NGOAddress,
        string[] memory _temporary
    ) public {
        listOfNGOs[_NGOAddress] =  NGODetails(_name, _location, _temporary, _temporary, _temporary, _temporary, _temporary, _temporary, 0);
    }

    // to increment the counter
    function updateEventCounterForNGO(
        address _NGOAddress
    ) internal {
        listOfNGOs[_NGOAddress].lastEventCounter += 1;
    }

    // structure to send back metadata only
    struct eventDetails {
        string eventName; // name of the event
        string eventLocation; 
        string shiftStartTime; // when the shift starts, volunteer clocks in
        string shiftEndTime; // when the shift ends, volunteer clocks out, or gets auto-clocked out
        string startDate;
        string endDate;
    }

    // to get complete information for an event given eventID and NGOAddress (for user)
    function getCompleteInformationOnAnEventUserRegisteredFor(uint128 _eventID, address _NGOAddress) public view returns (eventDetails memory) {
        NGODetails memory temp = listOfNGOs[_NGOAddress];
        eventDetails memory returnObj = eventDetails(temp.eventName[_eventID], temp.eventLocation[_eventID],temp.shiftStartTime[_eventID],temp.shiftEndTime[_eventID],temp.startDate[_eventID],temp.endDate[_eventID]);
        return returnObj;
    }

}
