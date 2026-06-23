import { useEffect, useMemo, useRef, useState } from 'react';
import { birthdayLetters, birthdayPages } from './birthdayContent';

const floatingSymbols = ['✿', '❀', '✽', '♡'];
const birthdayPhoto = `${import.meta.env.BASE_URL}moti-photo.png`;

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        symbol: index % 4 === 0 ? '\u2665' : index % 3 === 0 ? '\u2740' : index % 2 === 0 ? '\u273F' : '\u273D',
        left: `${(index * 37) % 100}vw`,
        delay: `${(index * 0.16) % 2.8}s`,
        duration: `${7 + (index % 6)}s`,
        kind: index % 4 === 0 ? 'particle heart' : index % 3 === 0 ? 'particle glitter' : 'particle flower',
      })),
    [],
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          className={particle.kind}
          key={particle.id}
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        >
          {particle.symbol}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [answer, setAnswer] = useState('');
  const [currentLetter, setCurrentLetter] = useState(null);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [typedText, setTypedText] = useState('');
  const typingTimer = useRef(null);

  useEffect(() => {
    if (!currentLetter) return;

    document.documentElement.style.setProperty('--c1', currentLetter.theme.backgroundOne);
    document.documentElement.style.setProperty('--c2', currentLetter.theme.backgroundTwo);
    document.documentElement.style.setProperty('--accent', currentLetter.theme.accent);
  }, [currentLetter]);

  useEffect(() => {
    if (!isModalOpen || !currentLetter) return undefined;

    let index = 0;
    const message = currentLetter.message;
    setTypedText('');

    function typeNextLetter() {
      setTypedText(message.slice(0, index + 1));
      const character = message[index];
      index += 1;

      if (index >= message.length) return;

      let delay = 22;
      if (['.', '?', '!'].includes(character)) delay = 280;
      if (character === ',') delay = 120;
      if (character === '\n') delay = 160;

      typingTimer.current = window.setTimeout(typeNextLetter, delay);
    }

    typingTimer.current = window.setTimeout(typeNextLetter, 500);

    return () => window.clearTimeout(typingTimer.current);
  }, [currentLetter, isModalOpen]);

  function unlockLetter(event) {
    event.preventDefault();
    const key = answer.trim().toLowerCase();

    if (birthdayLetters[key]) {
      setCurrentLetter(birthdayLetters[key]);
      setError('');
      setAnswer('');
      return;
    }

    setError(birthdayPages.homePage.wrongAnswer);
    setIsShaking(false);
    window.setTimeout(() => setIsShaking(true), 0);
  }

  function openLetter() {
    setIsCelebrating(true);
    setIsEnvelopeOpen(true);
    window.setTimeout(() => setIsModalOpen(true), 650);
  }

  function closeLetter() {
    window.clearTimeout(typingTimer.current);
    setIsCelebrating(false);
    setIsModalOpen(false);
    setTypedText('');
    window.setTimeout(() => setIsEnvelopeOpen(false), 350);
  }

  return (
    <main className="page">
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob blob-one" />
        <span className="blob blob-two" />
        <span className="blob blob-three" />
      </div>

      {isCelebrating ? <FloatingParticles /> : null}

      <section className={`screen ${currentLetter ? 'hidden' : ''}`} id="home">
        <form className={`card ${isShaking ? 'shake' : ''}`} onSubmit={unlockLetter}>
          <p className="small-label">{birthdayPages.homePage.smallLabel}</p>
          <h1>{birthdayPages.homePage.title}</h1>
          <p>{birthdayPages.homePage.subtitle}</p>
          <input
            autoComplete="off"
            onChange={(event) => setAnswer(event.target.value)}
            placeholder={birthdayPages.homePage.inputPlaceholder}
            value={answer}
          />
          <button type="submit">{birthdayPages.homePage.unlockButton}</button>
          <p className="error-message" role="status">
            {error}
          </p>
        </form>
      </section>

      <section className={`screen ${currentLetter ? '' : 'hidden'}`}>
        <div className="card">
          <p className="small-label">{birthdayPages.mailboxPage.smallLabel}</p>
          <h1>
            {currentLetter
              ? `${birthdayPages.mailboxPage.titlePrefix} ${currentLetter.name}`
              : ''}
          </h1>
          <p>{birthdayPages.mailboxPage.message}</p>
          <button className="envelope-container" type="button" onClick={openLetter}>
            <span className={`envelope ${isEnvelopeOpen ? 'open' : ''}`}>
              <span className="flap" />
              <span className="heart-seal">♥</span>
            </span>
          </button>
        </div>
      </section>

      <div className={`modal ${isModalOpen ? 'show' : ''}`} aria-hidden={!isModalOpen}>
        <article className="paper">
          <button
            aria-label={birthdayPages.letterPopup.closeButtonLabel}
            className="close-btn"
            type="button"
            onClick={closeLetter}
          >
            x
          </button>
          <h2>
            {currentLetter
              ? `${birthdayPages.letterPopup.titlePrefix} ${currentLetter.name}`
              : ''}
          </h2>
          <div className="letter-body">
            <p className={`letter-text ${typedText === currentLetter?.message ? 'finished' : ''}`}>
              {typedText}
            </p>
            <img className="letter-photo" src={birthdayPhoto} alt="Moti" />
          </div>
        </article>
      </div>
    </main>
  );
}
