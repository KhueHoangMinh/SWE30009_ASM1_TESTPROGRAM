const args = process.argv

const operators = [
    '+', '-', '*', '/'
];

function cal(a,b,o) {
    switch(o) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return undefined;
    }
}

function check_testcase(a,b) {
    const correct_result = (a-b)*2;
    const all_test_results = [];
    const unsatisfies = [];

    operators.forEach(o1 => {
        operators.forEach(o2 => {
            if(o1 !== '-' || o2 !== '*') {
                let test_result = cal(cal(a,b,o1),2,o2);
                all_test_results.push(`A = A ${o1} B and C = A ${o2} 2. OUTPUT: ${test_result}`);
                if(correct_result === test_result) {
                    unsatisfies.push(`A = A ${o1} B and C = A ${o2} 2. OUTPUT: ${test_result}`);
                }
            }
        });
    });

    return {
        correct_result,
        all_test_results,
        unsatisfies
    };
};

function find_concrete(start_a, end_a, start_b, end_b) {
    const concrete = [];

    for(let i = start_a; i <= end_a; i++) {
        for(let j = start_b; j <= end_b; j++) {
            if(check_testcase(i,j).unsatisfies.length === 0) {
                concrete.push([i,j]);
            }
        }
    }

    return concrete;
}

if(args[2] === "check_testcase") {
    try {
        const result = check_testcase(parseInt(args[3]), parseInt(args[4]));
        console.log(`Correct result: ${result.correct_result}\n`);
        console.log(`Possible wrong uses of operators that can not be checked (total ${result.unsatisfies.length}):\n`);
        result.unsatisfies.forEach((u, i) => {
            console.log(`${i+1}. ${u}\n`);
        });
    } catch (e) {
        console.log(e);
    }
} else if(args[2] === "find_concrete") {
    try {
        const concrete = find_concrete(parseInt(args[3]), parseInt(args[4]), parseInt(args[5]), parseInt(args[6]));
        console.log(`Concrete testcases found in range ${args[3]} <= A <= ${args[4]} and ${args[5]} <= B <= ${args[6]} (total ${concrete.length}):\n`);
        concrete.forEach((c, i) => {
            console.log(`${i+1}. A = ${c[0]} and B = ${c[1]}\n`);
        });
    } catch (e) {
        console.log(e);
    }
} else {
    console.log("Please specify command")
}

