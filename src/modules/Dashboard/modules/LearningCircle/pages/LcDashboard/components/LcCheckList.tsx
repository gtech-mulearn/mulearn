import { useState, useEffect } from "react";
import styles from "../LcDashboard.module.css";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import style from "../../../../../utils/modalForm.module.css";
import { updateLcNote } from "../../../services/LearningCircleAPIs";
import { useParams } from "react-router-dom";

type prop = {
    data: LcDetail | undefined;
};

const LcCheckList = (props: prop) => {
    const [items, setItems] = useState<ChecklistItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const [newItemText, setNewItemText] = useState("");

    useEffect(() => {
        try {
            if (props.data?.note) {
                const data = JSON.parse(props.data?.note);
                setItems(data);
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }, [props.data?.note]);

    const toggleItem = (id: number) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(newItems);
    };

    const addItem = () => {
        if (newItemText.trim() !== "") {
            const newItem = {
                id: Math.max(0, ...items.map(item => item.id)) + 1, // Simple ID generation
                text: newItemText,
                isChecked: false
            };
            setItems([...items, newItem]);
            setNewItemText("");
        }
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const sendToBackend = (data: string) => {
        let note = {
            note: data,
            id: id
        };
        if (data !== "[]" || items.length === 0) {
            updateLcNote(note);
        }
    };

    useEffect(() => {
        const dataString = JSON.stringify(items);
        sendToBackend(dataString);
    }, [items]);

    return (
        <div className={styles.CheckBoxContainerWrapper}>
            <h4
                style={{ fontWeight: "bold", textAlign: "left", width: "100%" }}
            >
                Enter your checklist
            </h4>
            <div className={styles.CheckBoxContentWrapper}>
                {items.map(item => (
                    <div key={item.id} className={styles.CheckBoxContainer}>
                        <input
                            type="checkbox"
                            checked={item.isChecked}
                            onChange={() => toggleItem(item.id)}
                        />
                        <label htmlFor="textInput">{item.text}</label>
                        <IoMdRemoveCircleOutline
                            style={{ fontSize: "20px !important" }}
                            onClick={() => removeItem(item.id)}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.CheckBoxContainerButton}>
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    +
                </button>
                <MuModal
                    isOpen={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    title={"Add a new Task"}
                    type={"success"}
                    onDone={() => {
                        addItem();
                        setIsOpen(false);
                    }}
                >
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            placeholder="Enter the task"
                            value={newItemText}
                            onChange={e => setNewItemText(e.target.value)}
                        />
                    </div>
                </MuModal>
            </div>
        </div>
    );
};

export default LcCheckList;
