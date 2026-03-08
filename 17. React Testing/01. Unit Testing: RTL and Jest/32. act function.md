# use of act functon

When we write test cases then many a times we need to update the state. Let's assume we're testing an onChange event or click event. Then we need to update the state. In this case we can get an issue, which is: When the state updates it takes some time but our assert function gets called before the state update. This leads to failing of the test case. To resolve this issue we use act function.

act function lets the state get updated first then calls the expect assertion

## Issue before using act function

## apply act function

## Interview Questions
