NLNG Award Nomination – Dummy Candidate JSON Files
=====================================================

IMPORTANT:
All names, departments, companies, teams, and records in these files are fictional
dummy data for development/testing only. Do not use them for real nominations.

Contents:
- candidates/ contains 28 separate JSON files, one for each award category.
- Each file contains 3 sample records.
- Every record uses the fields expected by the supplied HTML/JavaScript:
  "Employee Name", "Department", "Company", "Status".

Special awards:
- Most Collaborative Dept of the Year: dummy department names are placed in
  "Employee Name" so the same autocomplete data structure can be used if desired.
- Continuous Improvement Team (CIT) Award: dummy team names are placed in
  "Employee Name" for the same reason.
- Manager of the Year: the supplied form currently uses a free-text manager field;
  its JSON file is included as a sample but is not used by the current autocomplete.

Integration:
- Place the "candidates" folder beside your HTML file.
- Use the candidateFilesByAward mapping and award-specific loading/autocomplete
  code supplied in the conversation.
- The three special awards above are currently rendered as free-text fields in
  the original HTML, so their JSON lists will not be used unless those fields are
  changed to autocomplete inputs.

File count: 28 JSON files.
