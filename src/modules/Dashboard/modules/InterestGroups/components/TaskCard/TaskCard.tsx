// TaskCard component for Interest Groups
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Task } from '../../../LearningPathNew/services/api';

// Utility function to strip markdown formatting for card preview
const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/[#*_`~]/g, '') // Remove markdown characters
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
};

export interface TaskCardProps {
  task: Task;
  onClickCTA: (task: Task) => void;
  custom?: boolean;
  preview?: boolean; // New prop to control preview vs full display
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClickCTA, custom, preview = true }) => {
  if (!task) return null;

  return (
    <div onClick={() => onClickCTA(task)}>
      <h3>{task.title}</h3>
      <div>
        {preview ? (
          <p>{stripMarkdown(task.task_description).slice(0, 100) + "..."}</p>
        ) : (
          <ReactMarkdown>{task.task_description}</ReactMarkdown>
        )}
      </div>
      {task.hashtag && <span>#{task.hashtag}</span>}
      <p>Karma: {task.karma}</p>
      {task.completed && <span>Completed</span>}
    </div>
  );
};

export default TaskCard;
