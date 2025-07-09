'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!question || correctIndex === null || choices.some(c => c.trim() === '')) {
      alert("Lengkapi semua kolom dan tandai jawaban benar!");
      return;
    }

    await fetch('https://6858c221138a18086dfbc0ba.mockapi.io/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        choices,
        correctIndex
      })
    });

    setQuestion('');
    setChoices(['', '', '', '']);
    setCorrectIndex(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Buat Soal Baru</h2>
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Tulis pertanyaannya di sini..."
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {choices.map((choice, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <input
            className="flex-1 p-2 border rounded"
            placeholder={`Pilihan ${i + 1}`}
            value={choice}
            onChange={e => {
              const newChoices = [...choices];
              newChoices[i] = e.target.value;
              setChoices(newChoices);
            }}
          />
          <input
            type="radio"
            checked={correctIndex === i}
            onChange={() => setCorrectIndex(i)}
          />
          <span>Benar</span>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Submit
      </button>
      {success && <p className="text-green-600 mt-2">Soal berhasil disimpan!</p>}
    </div>
  );
}
