import React, { useEffect, useState, useRef } from "react";

import editIcon from "~/assets/edit.svg";
import Insert from "./Buttons/Insert";
import Generate from "./Buttons/Generate";
import Input from "./Input";



const LinkedInModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastGeneratedMessage, setLastGeneratedMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [insertButtonVisible, setInsertButtonVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const parentElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const generateMessage = () => {
    const messages = [
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    ];
    return messages[0];
  };

  const handleGenerateClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!inputValue.trim()) return;

    setIsGenerating(true);

    if (messagesRef.current) {
      const userMessageDiv = document.createElement("div");
      userMessageDiv.textContent = inputValue;
      Object.assign(userMessageDiv.style, {
        backgroundColor: "#DFE1E7",
        color: "#666D80",
        borderRadius: "12px",
        padding: "10px",
        marginBottom: "5px",
        textAlign: "right",
        maxWidth: "80%",
        alignSelf: "flex-end",
        marginLeft: "auto",
      });
      messagesRef.current.appendChild(userMessageDiv);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    setTimeout(() => {
      const generatedMessage = generateMessage();

      if (messagesRef.current) {
        const generatedMessageDiv = document.createElement("div");
        generatedMessageDiv.textContent = generatedMessage;
        Object.assign(generatedMessageDiv.style, {
          backgroundColor: "#DBEAFE",
          color: "#666D80",
          borderRadius: "12px",
          padding: "10px",
          marginBottom: "5px",
          textAlign: "left",
          maxWidth: "80%",
          alignSelf: "flex-start",
          marginRight: "auto",
        });
        messagesRef.current.appendChild(generatedMessageDiv);
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }

      setLastGeneratedMessage(generatedMessage);
      setInsertButtonVisible(true);
      setIsGenerating(false);
      setInputValue("");
    }, 500);
  };

  const handleInsertClick = () => {
    if (lastGeneratedMessage && parentElementRef.current) {
      const messageInput = parentElementRef.current.querySelector(
        ".msg-form__contenteditable"
      );
      if (messageInput) {
        messageInput.removeAttribute("aria-label");

        let existingParagraph = messageInput.querySelector("p");
        if (!existingParagraph) {
          existingParagraph = document.createElement("p");
          messageInput.appendChild(existingParagraph);
        }
        existingParagraph.textContent = lastGeneratedMessage;

        setInsertButtonVisible(false);
        setModalVisible(false);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".edit-icon")
    ) {
      setModalVisible(false);
      // Reset state when closing modal
      setInputValue("");
      setInsertButtonVisible(false);
      if (messagesRef.current) {
        messagesRef.current.innerHTML = "";
      }
    }
  };

  // Function to add edit icon to message input
  const addEditIcon = (parentElement: HTMLElement) => {
    if (!parentElement.querySelector(".edit-icon")) {
      parentElement.style.position = "relative";

      const iconContainer = document.createElement("div");
      iconContainer.className = "edit-icon-container";
      Object.assign(iconContainer.style, {
        position: "absolute",
        bottom: "5px",
        right: "5px",
        zIndex: "1000",
      });

      const icon = document.createElement("img");
      icon.className = "edit-icon";
      icon.src = editIcon;
      icon.alt = "Custom Icon";
      Object.assign(icon.style, {
        width: "30px",
        height: "30px",
        cursor: "pointer",
      });

      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        parentElementRef.current = parentElement;
        setModalVisible(true);
      });

      iconContainer.appendChild(icon);
      parentElement.appendChild(iconContainer);
    }
  };

  useEffect(() => {
    const handleMessageInputClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const messageInput = target.matches(".msg-form__contenteditable")
        ? target
        : target.closest(".msg-form__contenteditable");

      if (messageInput instanceof HTMLElement) {
        const parentElement = (messageInput.closest(".msg-form__container") ||
          messageInput) as HTMLElement;
        const contentContainer = messageInput.closest(
          ".msg-form_msg-content-container"
        );

        if (parentElement && contentContainer instanceof HTMLElement) {
          contentContainer.classList.add(
            "msg-form_msg-content-container--is-active"
          );
          parentElement.setAttribute("data-artdeco-is-focused", "true");
          addEditIcon(parentElement);
        }
      }
    };

    // Observe DOM for dynamically added message inputs
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const messageInputs = node.querySelectorAll(
              ".msg-form__contenteditable"
            );
            messageInputs.forEach((input) => {
              const parentElement = (input.closest(".msg-form__container") ||
                input) as HTMLElement;
              addEditIcon(parentElement);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Add click listeners
    document.addEventListener("click", handleMessageInputClick);
    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("click", handleMessageInputClick);
      document.removeEventListener("mousedown", handleClickOutside);
      observer.disconnect();
    };
  }, [modalVisible]);

  // Handle input focus maintenance
  useEffect(() => {
    const maintainFocus = () => {
      if (parentElementRef.current) {
        parentElementRef.current.setAttribute(
          "data-artdeco-is-focused",
          "true"
        );
      }
    };

    const inputElement = document.getElementById("input-text");
    const generateBtn = document.getElementById("generate-btn");
    const insertBtn = document.getElementById("insert-btn");

    [inputElement, generateBtn, insertBtn].forEach((element) => {
      element?.addEventListener("focus", maintainFocus);
    });

    return () => {
      [inputElement, generateBtn, insertBtn].forEach((element) => {
        element?.removeEventListener("focus", maintainFocus);
      });
    };
  }, []);

  return modalVisible ? (
    <div
      id="custom-modal"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4000,
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: "white",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "570px",
          padding: "20px",
        }}
      >
        <div
          ref={messagesRef}
          style={{
            marginTop: "10px",
            maxHeight: "200px",
            overflowY: "auto",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        />
        <Input inputValue={inputValue} setInputValue={setInputValue} />

        <div style={{ textAlign: "right", marginTop: "12px" }}>
          {insertButtonVisible && (
            <Insert
              lastGeneratedMessage={lastGeneratedMessage}
              setInsertButtonVisible={setInsertButtonVisible}
              setModalVisible={setModalVisible}
              parentElementRef={parentElementRef}
            />
          )}
          <Generate
            handleGenerateClick={handleGenerateClick}
            isGenerating={isGenerating}
            insertButtonVisible={insertButtonVisible}
          />
        </div>
      </div>
    </div>
  ) : null;
};
export default LinkedInModal;
