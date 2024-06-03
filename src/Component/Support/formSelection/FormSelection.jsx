import './FormSelection.scss'
import { Input, Button } from 'antd'
import { useState } from 'react';

const { TextArea } = Input;

const FormSection = ({ generateResponse }) => {
       const [newQuestion, setNewQuestion] = useState('');
    return (
        <div className="form-section">
            <TextArea
                rows={5}
                className="form-control"
                placeholder="Ask me anything..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            ></TextArea>
            <Button className="btn" type='primary' onClick={() => generateResponse(newQuestion, setNewQuestion)}>
                Generate Response 🤖
            </Button>
        </div>
    )
}

export default FormSection;