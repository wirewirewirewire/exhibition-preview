import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          Übersicht: "Overview",
          Vorderseite: "Front",
          Rückseite: "Back",
          otherLanguage: "Deutsch",
          "1945 und heute?": "1945 and today?",
          "Welcome to React": "Welcome to React and react-i18next",
          introText:
            "The year 1945 does not end in 1945. Until today it is important. We are curious about your thoughts, your knowledge and your questions. Get involved!",
          "Tippe auf die Tastatur um zu starten":
            "Tap on the keyboard to start",
        },
      },
      de: {
        translations: {
          otherLanguage: "English",
          introText:
            "Das Jahr 1945 endet nicht 1945. Bis heute ist es wichtig. Wir sind neugierig auf Ihre Gedanken, Ihr Wissen und Ihre Fragen. Bringen Sie sich ein!",

          "Data for lorem ipsum": "Data for lorem ipsum",
          "Start the filling process": "Befüllvorgang starten",
          "Vielen Dank für deine Einsendung!":
            "Many thanks for your submission!",
          "Deine Antwort wird jetzt überprüft.":
            "You're answer is getting reviewed now.",
        },
      },
    },
    fallbackLng: "de",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
