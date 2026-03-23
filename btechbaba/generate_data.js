import fs from 'fs';

const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
const subjectsSchema = [
    // Year 1
    [
        ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electrical Engineering', 'Engineering Graphics', 'Programming Fundamentals'], // Sem 1
        ['Engineering Mathematics II', 'Engineering Chemistry', 'Basic Electronics', 'Engineering Mechanics', 'English Communication'] // Sem 2
    ],
    // Year 2
    [
        ['Data Structures', 'Discrete Mathematics', 'Digital Logic Design', 'Object Oriented Programming', 'Computer Organization'], // Sem 3
        ['Operating Systems', 'Design & Analysis of Algorithms', 'Database Management Systems', 'Software Engineering', 'Computer Networks'] // Sem 4
    ],
    // Year 3
    [
        ['Theory of Computation', 'Compiler Design', 'Microprocessors', 'Web Technology', 'Machine Learning'], // Sem 5
        ['Artificial Intelligence', 'Cyber Security', 'Cloud Computing', 'Data Mining', 'Computer Graphics'] // Sem 6
    ],
    // Year 4
    [
        ['Internet of Things', 'Blockchain Technology', 'Cryptography', 'Big Data Analytics', 'Project Management'], // Sem 7
        ['Major Project', 'Internship', 'Advanced ML', 'Natural Language Processing', 'Distributed Systems'] // Sem 8
    ]
];

const curriculum = years.map((year, yIdx) => {
    return {
        year: year,
        semesters: [
            {
                semesterLabel: `Semester ${yIdx * 2 + 1}`,
                subjects: subjectsSchema[yIdx][0].map(sub => {
                    return {
                        name: sub,
                        chapters: [
                            { name: 'Unit 1: Introduction', link: '#' },
                            { name: 'Unit 2: Core Concepts', link: '#' },
                            { name: 'Unit 3: Advanced Topics', link: '#' },
                            { name: 'Unit 4: Formulations', link: '#' },
                            { name: 'Unit 5: Applications', link: '#' }
                        ],
                        pyqs: [
                            { name: '2023 Paper', link: '#' },
                            { name: '2022 Paper', link: '#' },
                            { name: '2021 Paper', link: '#' },
                            { name: '2020 Paper', link: '#' },
                            { name: '2019 Paper', link: '#' }
                        ]
                    };
                })
            },
            {
                semesterLabel: `Semester ${yIdx * 2 + 2}`,
                subjects: subjectsSchema[yIdx][1].map(sub => {
                    return {
                        name: sub,
                        chapters: [
                            { name: 'Unit 1: Introduction', link: '#' },
                            { name: 'Unit 2: Core Concepts', link: '#' },
                            { name: 'Unit 3: Advanced Topics', link: '#' },
                            { name: 'Unit 4: Formulations', link: '#' },
                            { name: 'Unit 5: Applications', link: '#' }
                        ],
                        pyqs: [
                            { name: '2023 Paper', link: '#' },
                            { name: '2022 Paper', link: '#' },
                            { name: '2021 Paper', link: '#' },
                            { name: '2020 Paper', link: '#' },
                            { name: '2019 Paper', link: '#' }
                        ]
                    };
                })
            }
        ]
    };
});

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/curriculum.js', `export const curriculumData = ${JSON.stringify(curriculum, null, 4)};\n`);
console.log('done');
