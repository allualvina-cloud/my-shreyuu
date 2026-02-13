import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Letter.css";

const Letter = ({ onMoreSurprises, onBack }) => {

  /* ---------------- MOBILE DETECTION ---------------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------------- TYPEWRITER STATE ---------------- */
  const [isTyping, setIsTyping] = useState(false);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  /* ✅ Memoized letter content (fixes ESLint warning) */
  const letterContent = useMemo(() => [
    ""To my Shreyuu",
"",
"Even though we are miles apart, I have never once felt distant from you.",
"When you messaged me first, I never imagined I would grow so deeply fond of you.",
"You walked into my life without knocking, and now I can’t imagine it without you.",
"",
"Now you’re on my mind 24/7, in the most beautiful way possible.",
"Every single day, I try to become a better version of myself.",
"I do it because one day when we finally meet, I want you to see the very best of me.",
"",
"I want to grow not just for myself, but for us.",
"Please always remember that no matter what happens, I am always here for you.",
"Your problems are my problems, so never hesitate to share them with me.",
"",
"You are the light of my loneliness.",
"Love of my heart.",
"Dew of my desert.",
"",
"Tune of my song.",
"Queen of my kingdom.",
"",
"No distance, no time, and no circumstance could ever change what I feel for you.",
"My heart chose you, and it keeps choosing you every single day.",
"",
"I love you more than words can ever fully express.",
"Forever yours,",
], []);


  const typingTimeoutRef = useRef(null);

  /* ⏳ Delay before typing */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  /* ✍️ Typing animation */
  useEffect(() => {
    if (!isTyping || currentLineIndex >= letterContent.length) return;

    const currentLine = letterContent[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];

          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = "";
          }

          newLines[currentLineIndex] =
            currentLine.substring(0, currentCharIndex);

          return newLines;
        });

        setCurrentCharIndex((prev) => prev + 1);
      }, 30);
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
    }

    return () => clearTimeout(typingTimeoutRef.current);
  }, [isTyping, currentLineIndex, currentCharIndex, letterContent]);

  /* 📜 Auto-scroll */
  useEffect(() => {
    const container = document.querySelector(".letter-content-area");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="letter-container">

      {/* ---------------- DESKTOP VERSION ---------------- */}
      {!isMobile && (
        <div className="mailbox-scene">
          <div className="mailbox">
            <div className="mailbox-lid"></div>
          </div>

          <div className="letter-rise">
            <LetterPaper
              displayedLines={displayedLines}
              isTyping={isTyping}
              currentLineIndex={currentLineIndex}
              letterContent={letterContent}
            />
          </div>
        </div>
      )}

      {/* ---------------- MOBILE VERSION ---------------- */}
      {isMobile && (
        <div className="mobile-letter-wrapper">
          <LetterPaper
            displayedLines={displayedLines}
            isTyping={isTyping}
            currentLineIndex={currentLineIndex}
            letterContent={letterContent}
          />
        </div>
      )}

      {currentLineIndex < letterContent.length && (
        <div className="typing-hint">
          Happy Valentine's Day! ❤️
        </div>
      )}
    </div>
  );
};

/* ---------------- LETTER PAPER COMPONENT ---------------- */

const LetterPaper = ({
  displayedLines,
  isTyping,
  currentLineIndex,
  letterContent,
}) => {
  return (
    <div className="vintage-letter-paper">
      <div className="paper-texture"></div>

      <div className="letter-content-area">
        <pre className="handwritten-text">
          {displayedLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < displayedLines.length - 1 && "\n"}
            </React.Fragment>
          ))}
          {isTyping && currentLineIndex < letterContent.length && (
            <span className="type-cursor">|</span>
          )}
        </pre>
      </div>

      <div className="paper-corner corner-tl"></div>
      <div className="paper-corner corner-tr"></div>
      <div className="paper-corner corner-bl"></div>
      <div className="paper-corner corner-br"></div>

      {currentLineIndex >= letterContent.length && (
        <div className="wax-seal">💌</div>
      )}
    </div>
  );
};

export default Letter;
