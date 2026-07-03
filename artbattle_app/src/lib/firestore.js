// Firestore 데이터 모델 & 헬퍼 함수
//
// sessions/{sessionId}
//   teacherId, artworkURL, artworkTitle, artworkArtist, totalRounds,
//   currentRound, status: 'lobby' | 'playing' | 'voting' | 'result' | 'ended',
//   code (6자리 접속 코드), createdAt, timerEndsAt
//
// sessions/{sessionId}/players/{uid}
//   name, photoURL, score, joinedAt
//
// sessions/{sessionId}/rounds/{roundNumber}/submissions/{uid}
//   text, votes, aiFeedback, createdAt
//
// hallOfFame/{entryId}
//   originalArtworkURL, winningText, aiGeneratedImageURL, studentName, sessionId, createdAt

import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';

// 6자리 접속 코드 생성
export function generateSessionCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createSession({ teacherId, artworkURL, artworkTitle, artworkArtist, totalRounds }) {
  const code = generateSessionCode();
  const ref = await addDoc(collection(db, 'sessions'), {
    teacherId,
    artworkURL,
    artworkTitle,
    artworkArtist,
    totalRounds,
    currentRound: 0,
    status: 'lobby',
    code,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, code };
}

export async function findSessionByCode(code) {
  const q = query(collection(db, 'sessions'), where('code', '==', code));
  const { getDocs } = await import('firebase/firestore');
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export function listenSession(sessionId, cb) {
  return onSnapshot(doc(db, 'sessions', sessionId), (snap) => {
    if (snap.exists()) cb({ id: snap.id, ...snap.data() });
  });
}

export function listenPlayers(sessionId, cb) {
  return onSnapshot(collection(db, 'sessions', sessionId, 'players'), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function joinSession(sessionId, uid, { name, photoURL }) {
  await setDoc(doc(db, 'sessions', sessionId, 'players', uid), {
    name,
    photoURL,
    score: 0,
    joinedAt: serverTimestamp(),
  });
}

export async function startRound(sessionId, roundNumber, durationSeconds = 180) {
  await updateDoc(doc(db, 'sessions', sessionId), {
    status: 'playing',
    currentRound: roundNumber,
    timerEndsAt: Date.now() + durationSeconds * 1000,
  });
}

export async function submitDescription(sessionId, roundNumber, uid, text) {
  await setDoc(
    doc(db, 'sessions', sessionId, 'rounds', String(roundNumber), 'submissions', uid),
    { text, votes: 0, createdAt: serverTimestamp() }
  );
}

export function listenSubmissions(sessionId, roundNumber, cb) {
  const ref = collection(db, 'sessions', sessionId, 'rounds', String(roundNumber), 'submissions');
  return onSnapshot(ref, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function openVoting(sessionId) {
  await updateDoc(doc(db, 'sessions', sessionId), { status: 'voting' });
}

export async function castVote(sessionId, roundNumber, submissionUid) {
  const ref = doc(db, 'sessions', sessionId, 'rounds', String(roundNumber), 'submissions', submissionUid);
  await updateDoc(ref, { votes: increment(1) });
}

export async function showResult(sessionId) {
  await updateDoc(doc(db, 'sessions', sessionId), { status: 'result' });
}

export async function saveAiFeedback(sessionId, roundNumber, uid, feedback) {
  const ref = doc(db, 'sessions', sessionId, 'rounds', String(roundNumber), 'submissions', uid);
  await updateDoc(ref, { aiFeedback: feedback });
}

export async function addToHallOfFame(entry) {
  await addDoc(collection(db, 'hallOfFame'), { ...entry, createdAt: serverTimestamp() });
}

export function listenHallOfFame(cb) {
  const q = query(collection(db, 'hallOfFame'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}
