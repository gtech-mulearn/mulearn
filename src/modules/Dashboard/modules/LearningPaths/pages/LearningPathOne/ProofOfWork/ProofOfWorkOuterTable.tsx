import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "../LearningPathOne.module.css";
import ProofOfWorkModal from "../ProofOfWorkModal";

type ProofOfWorkOuterTableProps = {
  taskList?: {
    proofOfWork: string;
    description: string;
    karmaPoint: number;
    topic: number;
  }[];
};

const ProofOfWorkOuterTable: React.FC<ProofOfWorkOuterTableProps> = ({ taskList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string>('');

  const handleOpenModal = (contentId: string) => {
      setSelectedContentId(contentId);
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedContentId('');
  };

  const handleProofSubmit = async (proofUrl: string) => {
    try {
        const response = await fetch('/api/update-proof', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contentId: selectedContentId,
                proofUrl
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update proof');
        }

        // Handle successful update (e.g., refresh content or update local state)
    } catch (error) {
        console.error('Error updating proof:', error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      {taskList && taskList.length > 0 ? (
        <table className={styles.proofTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Karma</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.tableCellElement}>
                    <strong>{item.proofOfWork}</strong>
                    <span>{item.description}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  {item.karmaPoint} Karma
                </td>
                <td className={styles.tableCell}>
                  <button
                    className={styles.uploadButton}
                    onClick={() => handleOpenModal('')}
                  >
                    Upload Proof
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No topics available</p>
      )}
      <ProofOfWorkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        contentId={selectedContentId}
        onSubmit={handleProofSubmit}
      />
    </div>
  );
};

export default ProofOfWorkOuterTable;
