import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import {googleProvider, auth, createUserProfileDocument, getCurrentuser} from "../../firebase/firebase.utils";
import {
  signOutFailure,
  signOutSuccess,
  singInFailure,
  singInSuccess,
  signUpSuccess,
  signUpFailure
} from "./user.actions";

export function* getSnapshopFromUserAuth(userAuth, additionalData) {
  try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(singInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* singInWithGoogle() {
  try{
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield getSnapshopFromUserAuth(user);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try{
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshopFromUserAuth(user);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try{
    const userAuth = yield getCurrentuser();
    if (!userAuth) return;
    yield getSnapshopFromUserAuth(userAuth);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* signOut() {
  try{
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({payload: {email, password, displayName}}) {
  try{
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({user, additionalData: {displayName}}));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
  try{
    yield getSnapshopFromUserAuth(user, additionalData);
  } catch (error) {
    yield put(singInFailure());
  }
}

export function* onGooglSinInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SING_IN_START, singInWithGoogle);
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SING_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGooglSinInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}