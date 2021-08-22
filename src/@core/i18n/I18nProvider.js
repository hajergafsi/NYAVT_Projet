import React from "react";
import {useLang} from "./Metronici18n";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/tr";
import { toAbsoluteUrl } from "../_helpers";

import enMessages from "./messages/en";
import trMessages from "./messages/tr";

export const allLanguages = {
  en: {
    name: "English",
    flag: toAbsoluteUrl("/media/svg/flags/226-united-states.svg"),
    messages: enMessages
  },
  tr: {
    name: "Turkish",
    flag: toAbsoluteUrl("/media/svg/flags/006-turkey.svg"),
    messages: trMessages
  }
}

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = allLanguages[locale].messages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
