# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Naming convention:
agentId - internal database id of an Agent
facilityCustomAgentId - new custom id

1. Create `Facilities_AgentIds` table with agentId, facilityId, and facilityCustomAgentId columns, with a unique key on (agentId, facilityId).

The table will store the Agent's custom ID at the Facility.

2. Create `createOrUpdateFacilityAgentId` function, which will take facilityId, agentId and facilityCustomAgentId as input and will put a new row (or update existing one) in the `Facilities_AgentIds` table.

The function will be used by the Facilities to define their own custom id of each agent.

3. Check if the agentId at Shifts returned from `getShiftsByFacility` is used anywhere else in the code. If yes then modify the function to return facilityCustomAgentId in addition to agentId, if not then replace agentId with facilityCustomAgentId.
Table `Facilities_AgentIds` stores facilityCustomAgentId for each pair of Facility and Agent. Use the agentId present in the Shifts metadata and the facilityId passed as input to find the facilityCustomAgentId.

The internal ID is an implementation detail, thus it should not propagate to the business logic layer, which is the reason for ID removal (if no longer used).

This change may break the functionality if shipped alone, thus make sure it's deployed together with, or after tasks 1 & 2, and together with task 4 (assuming that the id will have been removed).

4. Modify `generateReport` to use facilityCustomAgentId instead of agentId, obtained from Shifts metadata.

This change may break the functionality if shipped alone, thus make sure it's deployed together with, or after tasks 1 & 2, and together with task 3 (assuming that the id will have been removed).
