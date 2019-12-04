const PROFILE_RATES = [`novice`, `fan`, `movie buff`];
/*
0 — звание не отображается;
от 1 до 10 — novice;
от 11 до 20 — fan;
от 21 и выше — movie buff;
*/
const getProfileRate = (count) => {
  if (count > 1 && count <= 10) {
    return PROFILE_RATES[0];
  } else if (count > 11 && count <= 20) {
    return PROFILE_RATES[1];
  } else if (count > 21) {
    return PROFILE_RATES[2];
  }
  return ``;
};
export const createProfileTemplate = (countFilm) => {
  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${getProfileRate(countFilm)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);
};
