import React, { useState } from 'react';

const ResumeChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Resume context that will be sent with each query
  const resumeContext = `
    I am Piyush Kumar, a Bachelor of Technology student at Army Institute of Technology Pune in Electronics and Telecommunication (Oct 2021 - present).
    
    Work Experience:
    - Software Engineering Intern at Pilot Tech (Jun 2024 - Oct 2024)
      Working with Nest Js, Python, Fast Api, Jest, TypeScript, PostgreSQL
    - Full Stack Intern at Nihin Media KK Japan (May 2024 - Jun 2024)
      Working with Flutter, Python, Flask, Iframe Apis, PostgreSQL
    - Software Development Intern at Blue Bricks (Oct 2023 - April 2024)
      Working with Flutter, Firebase, Block, GetX, Hive, GoLang
    
    Projects:
    - DiagramGpt: AI-powered architecture diagram generator
    - FullStack Ebike Booking App with live tracking
    
    Skills:
    - Languages: C++, Dart, Java, Go, TypeScript, Python
    - Frameworks: Flutter, GetX, Golang, PostgreSQL, Nest Js, FastAPI, Flask
    - Tools: Git & GitHub, Virtual Machines, Jupyter Notebook
    
    Achievements:
    - Amazon Hackon 4.0 Top 30 Finalist
    - HackRX 4.0 Top 10 Teams
    - Smart India Hackathon 2022 finalist
  `;

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer AIzaSyDFN29JRM57KOXyISXMLoh5nTfKXoU-1oE`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Given this context about Piyush Kumar's background: ${resumeContext}\n\nQuestion: ${question}\n\nPlease provide a concise and accurate answer based only on the information provided above.`
            }]
          }]
        })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setAnswer(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setError('Failed to get answer. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Ask About My Background</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything about my experience, skills, or education..."
          className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={isLoading || !question.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Ask'}
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      {answer && (
        <div className="p-4 bg-gray-700 rounded">
          <h3 className="font-bold mb-2 text-white">Answer:</h3>
          <p className="text-gray-200 whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        Example questions:
        <ul className="list-disc ml-5 mt-1">
          <li>What are your primary programming languages?</li>
          <li>Tell me about your internship experience</li>
          <li>What projects have you worked on?</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeChat;
