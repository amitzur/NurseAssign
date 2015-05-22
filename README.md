# NurseAssign

Need to assign workers to shifts.
To model the week, `Timesheet` object is initialized with 7 days, 3 shifts each day.

`Timesheet.prototype` holds information about the necessary workforce in every shift.
For every shift there can be conditional additions to the workforce. This is covered in the `extra` property for each shift.
Each extra condition has a certain probability to occur, and IF/THEN clause.

`Timesheet.prototype.canWork` calculates whether a worker can work in a shift.


### NOTES:

1) need to account for:
zahav shift
extra hours
annual vacation (1-2 weeks)
sickness day
lecture day (YOM IYUN)
election day (YOM BHIRA - it's in the assignment, but the worker doesn't show up and does get money. TODO ask how this gets updated in the salary system)

2) towards the end of the month need to try assign workers that have remaining hours - otherwise it's vacation days or salary that goes off.

3) types of jobs:
100% - 154/month 40/week: 3w*5 + 1w*4
90%  - 139/month 36/week: 1w*5 + 3w*4
80%  - 123/month 32/week: 4w*5 (sometimes a 3 shifts week)
64%  - 99/month  26/week: 4w*3 (mostly the night shifters)
50%  - 77/month  20/week: 3w*2 + 1w*3
36%  - 56/month  14/week: 3w*2 + 1w*1 
25%  - students         : 1-3 shifts/week. Mostly evening with slight exceptions

4) Shifts:
morning: 0700-1500 (8hrs)
evening: 1430-2300 (8.5hrs)
night:   2230-0730 (9hrs)

5) Constraints:
 a. if worker is assigned for slot in same day - return false
 b. if worker is assigned for night in the day before the slot - return false
 c. if worker is assigned to more than 1 consecutive slots - return false (TODO with high probability - because it's extra hours)
 d. if shift is "morning" and worker is assigned already to "evening" in the day before - return false (TODO with high probability)

6) Types of requests:
negative: don't be in a particular shift or day
positive: be in a particular shift or day

7) Requests amount:
100% job: 3 requests / week
90%- job: 2 requests / week

8) How many workers in each shift:
morning: 7 nurses (5 + deputy + incharge). 4 aux. student - opportunistic. 
evening: 4 nurses. 2 aux. sometimes 1 student. sometimes 1 student + 1 aux. rare: 1 aux + 2 students.
night  : 3 nurses (desired). by constraint, 2 nurses + 1 aux/student.

deputy doesn't work wednesdays, and sometimes works friday/saturday
incharge doesn't work friday/saturday, and works only mornings.

friday morning: 4-5 nurses. 4 aux. students more opportunities
saturday morning: 4 nurses. 4 aux.
friday evening: 1 aux instead of 2.
