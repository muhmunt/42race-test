import account from '../../../src/entities/account';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default function addAccount(
  strava_id,
  username,
  firstname,
  lastname,
  bio,
  city,
  state,
  country,
  sex,
  summit,
  created_at,
  updated_at,
  badge_type_id,
  weight,
  profile_medium,
  profile,
  friend,
  follower,
  accountDbRepository
) {

  const newAccount = account(
    strava_id,
    username,
    firstname,
    lastname,
    bio,
    city,
    state,
    country,
    sex,
    summit,
    created_at,
    updated_at,
    badge_type_id,
    weight,
    profile_medium,
    profile,
    friend,
    follower
  );

  return accountDbRepository
    .findByProperty({ username })
    .then((userWithUsername) => {
      if (userWithUsername.length) {
        console.log(`User with username: ${username} already exists`);
        return
      }
      
      return accountDbRepository.add(newAccount);
    });
}
