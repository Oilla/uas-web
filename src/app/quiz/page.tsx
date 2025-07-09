'use client';
import { useEffect, useState } from 'react';

type Question = {
id: string;
question: string;
choices: string[];
correctIndex: number;
};

export default function QuizPage() {
const [questions, setQuestions] = useState<Question[]>([]);
const [index, setIndex] = useState(0);
const [selected, setSelected] = useState<number | null>(null);
const [feedback, setFeedback] = useState("");
const [score, setScore] = useState(0);

useEffect(() => {
    fetch('https://6858c221138a18086dfbc0ba.mockapi.io/questions')
    .then(res => res.json())
    .then(data => setQuestions(data));
}, []);

const handleNext = () => {
    if (selected === questions[index].correctIndex) {
    setScore(score + 1);
    setFeedback("✅ Benar!");
    } else {
    setFeedback("❌ Salah!");
    }

    setTimeout(() => {
    setFeedback("");
    setSelected(null);
    setIndex(index + 1);
    }, 1000);
};

if (questions.length === 0) return <p>Loading...</p>;
if (index >= questions.length) return <p>Selesai! Skor kamu: {score}/{questions.length}</p>;

const q = questions[index];

return (
    <div className="p-4 max-w-xl mx-auto">
    <h2 className="text-xl font-bold mb-4">{q.question}</h2>
    <div className="grid gap-2 mb-4">
        {q.choices.map((choice, i) => (
        <button
            key={i}
            onClick={() => setSelected(i)}
            className={`p-2 border rounded ${selected === i ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
            {choice}
        </button>
        ))}
    </div>
    <button
        onClick={handleNext}
        disabled={selected === null}
        className="bg-green-600 text-white px-4 py-2 rounded"
    >
        Next
    </button>
    {feedback && <p className="mt-2">{feedback}</p>}
    </div>
);
}
