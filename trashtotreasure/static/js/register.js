document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    };

    const response = await fetch("/users/add", options);
    //const data = await response.json();

    if (response.status == 201) {
      window.location.assign("/login");
    }
  });

async function checkLogin() {
  if (!document.cookie) {
    return;
  }

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/users/ping", options);
  const data = await response.json();
  console.log(data);
  if (data.status === "authorized") {
    window.location.assign("/homepage");
  }
}

checkLogin();

//kristians code above

//indian code below

// /*
//  * This entire block is wrapped in an IIFE to prevent polluting the scope of the web page with
//  * functions created by this extension.
//  */
// (function(realOpen, realSend, realFetch) {
//   /*
//    * Sometimes pages overwrite standard objects with global
//    * variables. Where possible, we extract fresh versions from an
//    * iframe.
//    */
//   const iframe = document.createElement('iframe');
//   document.documentElement.appendChild(iframe);

//   // Initialise with global values
//   let URL = window.URL;
//   let WeakMap = window.WeakMap;
//   let WeakSet = window.WeakSet;
//   let TextDecoder = window.TextDecoder;
//   let Uint8Array = window.Uint8Array;
//   let decodeURIComponent = window.decodeURIComponent;
//   let URLSearchParams = window.URLSearchParams;
//   let Array = window.Array;
//   let Object = window.Object;
//   let atob = window.atob;
//   let CustomEvent = window.CustomEvent;
//   let performance = window.performance;
//   let JSON = window.JSON;

//   /*
//    * Under some circumstances the iframe isn't added
//    * successfully. If it has a contentWindow then we can extract the
//    * values from it, but otherwise we fall back on the global
//    * values.
//    */
//   if (iframe.contentWindow) {
//       // Try block because sometimes the CORS prevents access to iframe
//       try {
//           URL = iframe.contentWindow.URL;
//           WeakMap = iframe.contentWindow.WeakMap;
//           WeakSet = iframe.contentWindow.WeakSet;
//           TextDecoder = iframe.contentWindow.TextDecoder;
//           Uint8Array = iframe.contentWindow.Uint8Array;
//           decodeURIComponent = iframe.contentWindow.decodeURIComponent;
//           URLSearchParams = iframe.contentWindow.URLSearchParams;
//           Array = iframe.contentWindow.Array;
//           Object = iframe.contentWindow.Object;
//           atob = iframe.contentWindow.atob;
//           CustomEvent = iframe.contentWindow.CustomEvent;
//           performance = iframe.contentWindow.performance;
//           JSON = iframe.contentWindow.JSON;
//       } catch (error) {
//           // Empty catch block to prevent errors from showing in page logs
//       }
//   }

//   // If iframe was added successfully, remove it
//   if (iframe.parentNode) {
//       iframe.parentNode.removeChild(iframe);
//   }

//   /*
//    * If any of the values don't have the correct type, return and
//    * don't attempt any monkey patching. This avoids breaking web
//    * pages.
//    */
//   for (f of [
//       URL,
//       WeakMap,
//       WeakSet,
//       TextDecoder,
//       Uint8Array,
//       decodeURIComponent,
//       URLSearchParams,
//       Array,
//       Object,
//       atob,
//       CustomEvent,
//   ]) {
//       if (typeof f !== 'function') {
//           return;
//       }
//   }

//   for (o of [performance, JSON]) {
//       if (typeof o !== 'object') {
//           return;
//       }
//   }

//   /*
//    * Override common funcions that accept callbacks, such as
//    * setInterval, to keep track of what script each callback comes
//    * from. Skimmers commonly have the actual skimming code in a
//    * callback, so most of the time when we intercept a request,
//    * document.currentScript is null. To solve this, the script is
//    * stored in a closure when the callback is passed, and assigned
//    * to callbackCurrentscript when the callback is run.
//    */

//   let callbackCurrentScript = null;

//   // Maps callbacks originally passed to patched versions
//   const patchedCallbackMap = new WeakMap();

//   // Maps patched callbacks to original versions
//   const originalCallbackMap = new WeakMap();

//   /**
//    *  Generates the function with which to override the
//    *  callback-accepting functions.
//    *  @param realFn The real function, e.g. setInterval.
//    *  @param callbackIndex The index of the callback in the
//    *  arguments of realFn. For example, the callback is the first
//    *  argument in setInterval, so callbackIndex should be 0.
//    */
//   function generateAddCallbackFunction(realFn, callbackIndex) {
//       const patched = function(...args) {
//           const script = document.currentScript || callbackCurrentScript;

//           const callback = args[callbackIndex];

//           // If the callback isn't a function, there's nothing to patch
//           if (typeof callback !== 'function') {
//               return realFn.apply(this, args);
//           }

//           // If a patch exists, use it instead of creating new function
//           let patchedCallback = patchedCallbackMap.get(callback);
//           if (!patchedCallback) {
//               patchedCallback = function() {
//                   callbackCurrentScript = script;
//                   const retVal = callback.apply(this, [...arguments]);
//                   callbackCurrentScript = null;
//                   return retVal;
//               };
//               patchedCallbackMap.set(callback, patchedCallback);
//               originalCallbackMap.set(patchedCallback, callback);
//           }

//           args[callbackIndex] = patchedCallback;
//           return realFn.apply(this, args);
//       };
//       // make toString() look native, #34
//       patched.toString = () => realFn.toString();
//       return patched;
//   }

//   const realSetInterval = window.setInterval;

//   window.setInterval = generateAddCallbackFunction(realSetInterval, 0);

//   const realSetTimeout = window.setTimeout;

//   window.setTimeout = generateAddCallbackFunction(realSetTimeout, 0);

//   const realPromiseThen = Promise.prototype.then;
//   Promise.prototype.then = generateAddCallbackFunction(realPromiseThen, 0);

//   const realPromiseCatch = Promise.prototype.catch;
//   Promise.prototype.catch = generateAddCallbackFunction(realPromiseCatch, 0);

//   const realPromiseFinally = Promise.prototype.finally;
//   if (realPromiseFinally) {
//       Promise.prototype.finally = generateAddCallbackFunction(
//           realPromiseFinally,
//           0
//       );
//   }

//   const realAddEventListener = EventTarget.prototype.addEventListener;

//   EventTarget.prototype.addEventListener = generateAddCallbackFunction(
//       realAddEventListener,
//       1
//   );

//   /*
//    * removeEventListener needs to be patched to map the passed
//    * listener to the patched listener.
//    */
//   const realRemoveEventListener = EventTarget.prototype.removeEventListener;
//   EventTarget.prototype.removeEventListener = function(...args) {
//       args[1] = patchedCallbackMap.get(args[1]) || args[1];

//       return realRemoveEventListener.apply(this, args);
//   };
//   EventTarget.prototype.removeEventListener.toString = () =>
//       realRemoveEventListener.toString();

//   /*
//    * Event listeners are sometimes set by directly assigning to a
//    * property from the GlobalEventHandlers mixin,
//    * e.g. 'submitBtn.onclick'. For each of the GlobalEventHandlers
//    * implementations that are likely to be relevant, the event
//    * properties likely to be used by skimmers are overridden with
//    * our version that tracks currentScript when assigned.
//    */
//   for (const eventTarget of [
//       HTMLElement.prototype,
//       Document.prototype,
//       window,
//   ]) {
//       for (const eventName of [
//           'onclick',
//           'onblur',
//           'onfocus',
//           'onchange',
//           'oninput',
//           'onkeydown',
//           'onkeypress',
//           'onkeyup',
//           'onload',
//           'onloadend',
//           'onmousedown',
//           'onmouseenter',
//           'onmouseleave',
//           'onmousemove',
//           'onmouseout',
//           'onmouseover',
//           'onmouseup',
//           'onpointerdown',
//           'onpointermove',
//           'onpointerup',
//           'onpointerover',
//           'onpointerout',
//           'onpointerenter',
//           'onpointerleave',
//           'onsubmit',
//       ]) {
//           const descriptor = Object.getOwnPropertyDescriptor(
//               eventTarget,
//               eventName
//           );

//           if (!descriptor) {
//               continue;
//           }

//           const realGetter = descriptor.get;
//           const realSetter = descriptor.set;

//           const patchedSetter = generateAddCallbackFunction(realSetter, 0);

//           /*
//            * In case a script checks the value of the property after
//            * setting it, the getter has to be patched to return the
//            * original callback.
//            */
//           const patchedGetter = function() {
//               const realValue = realGetter.call(this);

//               const originalCallback = originalCallbackMap.get(realValue);
//               if (originalCallback) {
//                   return originalCallback;
//               } else {
//                   return realValue;
//               }
//           };

//           patchedGetter.toString = () => realGetter.toString();

//           Object.defineProperty(eventTarget, eventName, {
//               get: patchedGetter,
//               set: patchedSetter,
//           });
//       }
//   }

//   /*
//    * This script has some dependencies that need to be included
//    * without polluting the global namespace. This is achieved by
//    * inserting them into the source at build time in the
//    * makefile. This is preferable to loading the dependencies via
//    * AJAX, because the latter doesn't work if the CSP disallows
//    * unsafe-eval. The following tag tells the makefile where to
//    * insert the dependencies.
//    */
//   // <DEPENDENCIES>
// class InputAnalyser {
//   constructor(_inputs) {
//       this._inputs = _inputs;
//       this._irrelevantInputs = new WeakSet();

//       /*
//        * Not currently using Password because it was causing too
//        * many false positives. Some sites use external auth domains,
//        * and many have misconfigured analytics that collect
//        * passwords.
//        */
//       this.relevantInputs = [new CardNumber()];
//   }

//   get relevantInputValues() {
//       const inputs = {};
//       this._inputs.forEach(
//           input => (inputs[input.id || input.name] = input.value)
//       );

//       return inputs;
//   }

//   get relevantFilledInputs() {
//       return this.allInputs
//           .filter(input => this.isRelevantElement(input))
//           .filter(input => input.value.length >= cons.minInputSize)
//           .map(input => ({
//               id: input.id,
//               name: input.name,
//               value: input.value,
//           }));
//   }

//   get allInputs() {
//       this._inputs = [
//           ...document.querySelectorAll(
//               this.relevantInputs.map(i => i.relevantInputTypes).join(', ')
//           ),
//       ];

//       return this._inputs;
//   }

//   static getLabelText(input) {
//       if (!input.labels.length) {
//           return '';
//       }
//       return stripSpecialChars(input.labels[0].textContent).trim();
//   }

//   /**
//    * Takes an HTMLElement and determines whether or not it could be relevant for the purposes of
//    * skimmer detection.
//    * @param {HTMLElement} input The element which is to be checked for relevancy.
//    * @returns {boolean} Returns true if the element is potentially relevant (e.g. a credit card
//    * field or other such sensitive input).
//    */
//   isRelevantElement(input) {
//       // If the element has been identified as irrelevant, return false
//       if (this._irrelevantInputs.has(input)) {
//           return false;
//       }

//       // Check the input against all the relevant input types
//       const relevances = this.relevantInputs.map(i => i.test(input));

//       /*
//        *  If they all agree that this input is unlikely to become
//        *  relevant, exclude it from further checks and return false
//        */
//       if (relevances.every(i => i === RelevantInput.relevance.NOT_RELEVANT)) {
//           this._irrelevantInputs.add(input);
//           return false;
//       }

//       // Return true if any consider the input to be relevant, otherwise false
//       return relevances.some(i => i === RelevantInput.relevance.RELEVANT);
//   }
// }
// /*
// * Input Matcher represents a class that can have matches with relevant inputs.
// * Each class that inherits must implement the findInputMatches method.
// */
// class InputMatcher {
//   /*
//    * Finds any matches with the list of inputs.
//    * @param inputs. An object whose values represent relevant inputs.
//    * @return {[String]} The keys of the inputs that were found.
//    */
//   findInputMatches(inputs) {
//       throw new Error('findInputMatches has not been implemented.');
//   }

//   /**
//    * Determines whether one or more values in needles are present in any of
//    * the keys of the haystacks.
//    * Checks both raw input and base64 encoded versions of the needles.
//    * @param needles An object. The haystacks are searched for the values of
//    * this object.
//    * @param haystacks The array of strings in which the needle(s) may reside.
//    * A string may optionally be supplied if only one value is present.
//    * @returns {[String]} The keys of the needles that were found in one or
//    * more haystacks in either raw or base64 encoded form.
//    */
//   static atLeastOneNeedleInHaystack(needles, haystacks) {
//       if (
//           needles === undefined ||
//           needles.length === 0 ||
//           haystacks === undefined
//       ) {
//           return [];
//       }

//       const searchArray = Array.isArray(haystacks) ? haystacks : [haystacks];

//       return Object.entries(needles)
//           .filter(([_, needle]) =>
//               searchArray.some(haystack => {
//                   if (isBase64Encoded(haystack)) {
//                       if (atob(haystack).indexOf(needle) !== -1) {
//                           return true;
//                       }
//                   }
//                   return haystack.indexOf(needle) !== -1;
//               })
//           )
//           .map(([input, _]) => input);
//   }
// }
// /*
// * Matcher for an object that cannot contain any inputs.
// */
// class EmptyMatcher extends InputMatcher {
//   findInputMatches(inputs) {
//       return [];
//   }
// }

// class URLParamsMatcher extends InputMatcher {
//   constructor(url) {
//       super();
//       this._url = url;
//   }

//   findInputMatches(inputs) {
//       try {
//           const parsedUrl = new URL(this._url);
//           return InputMatcher.atLeastOneNeedleInHaystack(inputs, [
//               ...parsedUrl.searchParams.values(),
//           ]);
//       } catch (e) {
//           return [];
//       }
//   }
// }

// class StringBodyMatcher extends InputMatcher {
//   constructor(str) {
//       super();
//       this._str = str;
//   }

//   findInputMatches(inputs) {
//       let decoded;
//       try {
//           decoded = decodeURIComponent(this._str);
//       } catch (e) {
//           decoded = this._str;
//       }

//       const searchParams = new URLSearchParams(decoded);
//       const parsedQuery = {};
//       const parsedValues = [];

//       for (const [key, value] of searchParams.entries()) {
//           parsedQuery[key] = value;
//           parsedValues.push(value);
//       }

//       if (parsedQuery !== {} && parsedValues.indexOf(null) === -1) {
//           return InputMatcher.atLeastOneNeedleInHaystack(
//               inputs,
//               parsedValues
//           );
//       }
//       return InputMatcher.atLeastOneNeedleInHaystack(inputs, decoded);
//   }
// }

// class FormBodyMatcher extends InputMatcher {
//   constructor(formData) {
//       super();
//       this._formData = formData;
//   }

//   findInputMatches(inputs) {
//       return InputMatcher.atLeastOneNeedleInHaystack(
//           inputs,
//           Object.values(this._formData).flat()
//       );
//   }
// }
// /**
// * Takes a string and removes a variety of 'special' characters like punctuation.
// * @param str The string to be modified.
// * @returns {string} The resulting string without any special characters.
// */
// function stripSpecialChars(str) {
//   return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>}{\][\\/]/gi, '');
// }

// /**
// * Attempts to identify where a string is base-64 encoded or not.
// * @param string The raw string to be examined.
// * @returns {boolean} Returns true if the string matches a base-64 string. False otherwise.
// */
// function isBase64Encoded(string) {
//   return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(
//       string
//   );
// }

// // Computes the base64 sha512/sha224 hash of some text, removing trailing ==
// function base64hash(hashFunction, text) {
//   return btoa(
//       hashFunction
//           .array(text)
//           .map(char => String.fromCharCode(char))
//           .join('')
//   ).slice(0, -2);
// }

// function normaliseUrl(str) {
//   const link = document.createElement('a');
//   link.href = str;
//   return link.href;
// }

// function stripCredentials(urlstr) {
//   try {
//       const url = new URL(urlstr);
//       const params = url.searchParams;
//       params.forEach((_, key) => params.set(key, ''));
//       return url.toString();
//   } catch (e) {
//       return urlstr;
//   }
// }

// /**
// * Check if two URLs match regardless of any partial encoding.
// *
// * Uses decodeURI which can throw a URIError when url is malformed.
// */
// function urlsMatch(first, second) {
//   try {
//       return decodeURI(first) === decodeURI(second);
//   } catch (e) {
//       return false;
//   }
// }

// function sendMessage(type, data, tabId, options) {
//   if (tabId) {
//       chrome.tabs.sendMessage(tabId, { data, type }, options);
//   } else {
//       chrome.runtime.sendMessage({ data, type });
//   }
// }

// // Encodes the given input using base64url as defined by RFC4648 section 5.
// function base64Url(input) {
//   return btoa(input)
//       .replace('+', '-')
//       .replace('/', '_');
// }
// /*
// * Netcraft Extension
// * constants JavaScript
// */

// /* eslint sort-keys: 'off' */
// /* sort-keys is disabled as the constants are separated by type */

// // Aligned values here make for easier reading, so we disable prettier

// // prettier-ignore
// const cons = (function() {
//   const cryptojackersUrl = 'https://www.netcraft.com/apps/help/glossary/#crypto-miners';
//   const skimmersUrl = 'https://www.netcraft.com/apps/help/glossary/#credit-card-skimmers';
//   const evilResourceCrime = 'attempted to load';

//   return {
//       fields: [
//           'topsites',
//           'country',
//           'netblock',
//           'hoster',
//           'firstseen',
//           'rank',
//           'risk',
//           'uses_sslv3',
//           'pfs',
//           'heartbleed',
//           'heartbleed_message',
//       ],

//       // options that can be toggle in options.js and installed flag

//       toggleOptions: [
//           'installed',
//           'block',
//           'xss',
//           'suspicious',
//           'other-malicious-scripts',
//           'credential-leaks',
//           'analytics',
//           'cryptojackers',
//           'skimmers',
//       ],

//       // domains
//       mirror:  'https://mirror2.extension.netcraft.com/',
//       toolbar: 'https://mirror.toolbar.netcraft.com/',

//       // links and faqs
//       blogArchive:      'https://news.netcraft.com/archives/',
//       browserApp:       'https://www.netcraft.com/apps/browser/',
//       cryptojackersUrl,
//       extensionStore:   'https://chrome.google.com/webstore/detail/netcraft-anti-phishing-ex/bmejphbfclcpmpohkggcjeibfilpamia',
//       heartbleedUrl:    'https://www.netcraft.com/apps/help/glossary/#heartbleed',
//       logBlockedVisit:  'https://toolbar.netcraft.com/blocked_visit',
//       netblock:         'https://sitereport.netcraft.com/netblock?q=',
//       pfsUrl:           'https://www.netcraft.com/apps/help/glossary/#pfs',
//       report:           'https://sitereport.netcraft.com/?url=',
//       reportAPI:        'https://report.netcraft.com/api/v2/report/urls',
//       reportMistake:    'https://report.netcraft.com/report/mistake?url=',
//       skimmersUrl,
//       sslv3Url:         'https://www.netcraft.com/apps/help/glossary/#sslv3',
//       submissionURL:    'https://report.netcraft.com/submission/',
//       topsites:         'https://trends.netcraft.com/topsites?s=',

//       // paths
//       block:              'blocked.html',
//       check:              'check_url/v4/',
//       danger:             'Images/danger.png',
//       embed:              '/embedded',
//       evilJSPatternsFeed: 'eviljspatterns',
//       skimmerDomainWhitelistFeed: 'eviljsskimmerwhitelist',
//       evilResourcesFeed:  'blockdb/netcraft_extension_evil_resource_encrypted-yppL7bVh/',
//       flags:              'Images/flags/',
//       force:              '/dodns',
//       heartbleed:         'Images/heartbleed.png',
//       info:               '/info',
//       poodlePost:         '2014/10/15/googles-poodle-affects-oodles.html',
//       warning:            'Images/warning.png',

//       // feed constants
//       evilResourceTypes: ['cryptojacker', 'skimmer'],
//       evilResourcesSalt: 'C4jhYHxW',
//       maxRevisions:      5,
//       randomSaltLength:  8,

//       // mappings of url_type => information
//       urlTypeInformationMappings: {
//           'malicious_javascript/cryptojacker': ['web miners',             cryptojackersUrl],
//           'malicious_javascript/skimmer':      ['shopping site skimmers', skimmersUrl],
//       },

//       // mappings of evilResourceTypes => user options
//       evilResourceOptionMappings: {
//           'cryptojacker': 'cryptojackers',
//           'skimmer':      'skimmers'
//       },

//       // mappings of user options => url_type
//       optionUrlTypeMappings: {
//           'block':                   /^(?!malicious_javascript:)/,
//           'cryptojackers':           /^malicious_javascript\/cryptojacker$/,
//           'other-malicious-scripts': /^malicious_javascript\/(?!(skimmer|cryptojacker)$)/,
//           'skimmers':                /^malicious_javascript\/skimmer$/,
//       },

//       // report constants
//       malwareSourceEmail:  'extension-reported-malware@netcraft.com',
//       malwareSourceUUID:   'mwcCcApi89cobY9loJ9rWJ9HuOhlpwMj',
//       extensionSourceUUID: 'qBEQ3NhEnwK4sypmuSxBJzRqpxZLRXxe',

//       // report error default message
//       reportErrorMessage: 'An error occured with your submission. Please try again.',

//       // mapping from report API errors to displayed messages
//       reportErrorMappings: {
//           'Duplicate of a recent submission': 'This URL has already been reported.',
//           'Supplied email is not valid': 'Invalid email address. Please correct it and try again.',
//       },

//       whitelistErrorMessages: {
//           invalidHostname: 'Invalid hostname, please correct it and try again',
//           duplicate: 'Protection is already disabled for this site',
//       },

//       // browserAction icon paths
//       iconNormal: {
//           16: 'Images/action-normal-16.png',
//           24: 'Images/action-normal-24.png',
//           32: 'Images/action-normal-32.png'
//       },
//       iconDanger: {
//           16: 'Images/action-danger-16.png',
//           24: 'Images/action-danger-24.png',
//           32: 'Images/action-danger-32.png'
//       },
//       iconWarning: {
//           16: 'Images/action-warning-16.png',
//           24: 'Images/action-warning-24.png',
//           32: 'Images/action-warning-32.png'
//       },
//       iconDisabled: {
//           16: 'Images/action-disabled-16.png',
//           24: 'Images/action-disabled-24.png',
//           32: 'Images/action-disabled-32.png'
//       },

//       // Extension internal message types
//       capturedIntercept:  'interceptDetailsCaptured',
//       confirmedIntercept: 'interceptDetailsConfirmed',
//       contentReady:       'contentScriptReady',
//       leaksEnabled:       'credentialLeaksEnabled',
//       reportURL:          'report',
//       reqBlock:           'block',
//       reqDetails:         'details',
//       reqForce:           'force',
//       reqPopUp:           'popup',
//       reqPrintTimingData: 'time', //debug
//       reqInputs:          'requestInputValues',
//       sendInputs:         'sendInputs',
//       sendIntercept:      'sendInterceptDetails',
//       updateOption:       'updateOption',
//       updateWhitelist:    'whitelist', // disable button whitelist

//       // Status codes
//       errEvilResource: 'EVILRESOURCE',
//       errNoDetails:    'NODETAILS',
//       errNoInfo:       'NOINFO',
//       errBlocked:      'BLOCKED',
//       errPending:      'PENDING',
//       errServer:       'ERROR',
//       errSuspicious:   'SUSPICIOUS',
//       errTimeout:      'TIMEOUT',
//       errXSS:          'XSS',
//       noError:         'OK',

//       // Valid protocols (it is a regex match so ^ matches start of string)
//       protocols:    ['^http', '^https', '^ftp'],

//       // Human readable messages
//       msgNa:           'NA',
//       msgNewSite:      'New Site',
//       msgNoInfo:       'Site information not available',
//       msgNoServer:     'Unable to contact Netcraft servers',
//       msgSuspicious:   'Suspicious URL Detected',
//       msgXSS:          'Suspected XSS Attack',
//       msgBlocked:      {
//           'malicious_javascript/skimmer': {
//               title: 'Shopping Site Skimmer Detected',
//               description: 'shopping site skimmer'
//           },
//           'malicious_javascript/dropsite': {
//               title: 'Potential Credential Leak Detected',
//               description: 'potential credential leak'
//           },
//           'malicious_javascript/cryptojacker': {
//               title: 'Web Miner Detected',
//               description: 'web miner'
//           },
//           'malware_c2/infrastructure': {
//               title: 'Malicious URL',
//               description: 'malicious page'
//           },
//           'default': {
//               title: 'Suspected Phishing',
//               description: 'suspected phishing site'
//           },
//       },

//       // Human readable reasons
//       urlTypeCrimeMappings: {
//           'malicious_javascript/skimmer':      evilResourceCrime,
//           'malicious_javascript/cryptojacker': evilResourceCrime,
//           'malicious_javascript/dropsite':     ' is blocked because we detected that sensitive information was leaked from',
//       },

//       // Timeout function value to clear cache etc.
//       timeout:      300000,

//       // Skimmer whitelist update interval (1 day)
//       skimmerWhitelistInterval: 1000 * 60 * 60 * 24,

//       // Google Analytics account
//       account:      'UA-2150242-8',
//       gaCategory:   'Popup load times',

//       // InputAnalyser constants
//       minInputSize: 5,

//       // First addresses of the private IPv4 netblocks
//       privateIPv4Blocks: [
//           '10.0.0.0',
//           '172.16.0.0',
//           '192.168.0.0'
//       ],

//       // Sync storage key for disable for this site button whitelist
//       disableButtonWhitelistKey: 'disableButtonWhitelist',

//       // Local storage key for local credential leak detection whitelist
//       localCredentialLeakWhitelistKey: 'localCredentialLeakWhitelist',

//       // Whitelisted fileName regexes for credential leak detection
//       credentialLeakFileNameWhitelist: [
//           /^https?:\/\/googleads.g.doubleclick.net\//,
//       ],
//   };
// })();

// /*
// * recursively prevents any property or sub-property in cons from:
// *   - being added;
// *   - being removed; or
// *   - being modified.
// */
// function deepFreeze(object) {
//   Object.freeze(object);

//   for (const name of Object.getOwnPropertyNames(object)) {
//       if (typeof object[name] === 'object') {
//           deepFreeze(object[name]);
//       }
//   }
// }

// deepFreeze(cons);
// /*
// * RelevantInput objects check whether given form inputs should be
// * treated as sensitive data.
// *
// * This should be treated as an abstract class. Only the subclasses
// * are intended to be instantiated.
// */
// class RelevantInput {
//   /*
//    * Enum of the possible return values of test():
//    * RELEVANT:
//    *     Input is relevant now, outgoing requests should be
//    *     checked for the contained value (subject to minimum length).
//    * POTENTIALLY RELEVANT:
//    *     Input should not be considered relevant now, but may be in
//    *     future so should continue to be checked.
//    * NOT_RELEVANT:
//    *     Input is not relevant and will not become relevant, so can
//    *     be ommitted from further checks to optimise performance.
//    */
//   static get relevance() {
//       return {
//           NOT_RELEVANT: 1,
//           POTENTIALLY_RELEVANT: 2,
//           RELEVANT: 3,
//       };
//   }

//   /*
//    * relevantInputTypes (string) - a comma separated list of
//    * selectors that describe the types of input that should be
//    * considered relevant.
//    */
//   constructor(relevantInputTypes) {
//       this.relevantInputTypes = relevantInputTypes;
//   }

//   /*
//    * Checks whether any of the given input's 'labels' (the ID, name,
//    * or actual label) match the given regex.
//    */
//   static testInputLabel(regex, input) {
//       const labels = [
//           input.id,
//           input.name,
//           InputAnalyser.getLabelText(input),
//       ];
//       return labels.some(label => regex.test(label));
//   }
// }

// /*
// * RelevantInput for passwords.
// */
// class Password extends RelevantInput {
//   constructor() {
//       super('input[type=password]');
//   }

//   /*
//    * Passwords are verified purely by their input type.
//    */
//   test(input) {
//       if (input.matches(this.relevantInputTypes)) {
//           return RelevantInput.relevance.RELEVANT;
//       } else {
//           return RelevantInput.relevance.NOT_RELEVANT;
//       }
//   }
// }

// /*
// * RelevantInput for card numbers.
// */
// class CardNumber extends RelevantInput {
//   constructor() {
//       // Inputs with no type attribute act like text inputs
//       super(
//           'input[type=text], input[type=tel], input[type=number], input:not([type])'
//       );

//       // Definitely card number labels
//       this.inputLabelRegexes = [
//           /(cc|card).?(num|no)/i,
//           /カード番号/,
//           /Номер.*карты/i,
//           /信用卡卡號/i,
//           /信用卡号码/i,
//       ];

//       /*
//        * Matches incomplete card numbers, because ideally the
//        * skimmer should be detected before the victim gives away
//        * most of their card number.
//        */
//       this.inputValueRegexes = [/^(\d{4}[-\s]?){0,4}\d{1,4}$/];

//       // Probably card number labels
//       this.suspectInputLabelRegexes = [
//           /card/i,
//           /tarjeta/i,
//           /carte/i,
//           /карты/i,
//           /卡/i,
//           /カード/i,
//           /카드/i,
//           /credit[^s]/i,
//       ];

//       // If it matches one of these, probably not a card number
//       this.inputLabelExceptionRegexes = [
//           /post/i,
//           /code/i,
//           /zip/i,
//           /acc(oun)?t?[-_]?n(um|o)/i,
//           /credit[-_]?(sum|limit)/i,
//           /loyalty/i,
//           /gift/i,
//           /idcard/i,
//           /cardid/i,
//           /club/i,
//           /sku/i,
//           /(\b|_)otp/i,
//           /price/i,
//           /amount/i,
//           /service/i,
//           /picard/i,
//           /search/i,
//           /contact/i,
//           /callme/i,
//           /chat/i,
//           /activate/i,
//           /msisdn/i,
//       ];
//   }

//   test(input) {
//       if (!input.matches(this.relevantInputTypes)) {
//           return RelevantInput.relevance.NOT_RELEVANT;
//       }

//       // Return NOT_RELEVANT if label matches an exception regex
//       if (
//           this.inputLabelExceptionRegexes.some(r =>
//               RelevantInput.testInputLabel(r, input)
//           )
//       ) {
//           return RelevantInput.relevance.NOT_RELEVANT;
//       }

//       // Return RELEVANT if label clearly states card number
//       if (
//           this.inputLabelRegexes.some(r =>
//               RelevantInput.testInputLabel(r, input)
//           )
//       ) {
//           return RelevantInput.relevance.RELEVANT;
//       }

//       /*
//        * If label suggests card number, return RELEVANT if value
//        * also suggests card number or POTENTIALLY_RELEVANT if
//        * not. Otherwise, return NOT_RELEVANT as this element will
//        * not become relevant unless a label changes (unlikely).
//        */
//       if (
//           this.suspectInputLabelRegexes.some(r =>
//               RelevantInput.testInputLabel(r, input)
//           )
//       ) {
//           if (this.inputValueRegexes.some(r => r.test(input.value))) {
//               return RelevantInput.relevance.RELEVANT;
//           } else {
//               return RelevantInput.relevance.POTENTIALLY_RELEVANT;
//           }
//       } else {
//           return RelevantInput.relevance.NOT_RELEVANT;
//       }
//   }
// }

//   const inputAnalyser = new InputAnalyser();

//   const resourceBlockList = new Set([
//                           "00069CEC347076721EBE2257978A0A33", "05ECA17FF0EA78669ED43B2BD7B63571", "05F4A2D3161A92EB82A44F15FC2A3AEC", "0BA566B4777526F451108100107DC5ED", "0D6E1B5F03B81F5C37813B22E29C4FE2", "14680B874252B2BB7C64DEBA038381B3", "14E8729CBB16AC3625EAA0D7A679E56E", "1FB784EBAFDA1618023756BF5B6D7E46", "21B81AFE3E30A79E09854F8F6CF678D4", "25A781F6D1F94EEACCF1E00E844D9E14", "25CE912FAF2376026AAD0174AD5A0329", "2DBD7D54022C28273ADE3147B8EEB076", "3920B04ED0D215EA738F524F60485F23", "44E503B3621513B9D3666F284E4DF47A", "45573B3E2F613AF5BF2145DF004BABD1", "4C70569BBE1821F5655382660807FA77", "4CD96A830DAC0E0B5EBE578B0DD870AE", "50B8BC213FB188A687173C1A0A77EA57", "52F16E0C90077DC8825EDE1F4DB30A34", "5709DC60CFC365B7064B06C709A9D32B", "59DF8523520DE7F08FB53D3D12BD94F5", "61DAF8537240639277FD1A5908A131A4", "669853BEA9B84EA51D7302A7FBFF5BC3", "6C590F97DDB1A11AE795B3050E4C3866", "6CBDD0E4585B48ABB60BA3DEBE0750F0", "6F1DC1309CFE734C038685D8F17A3B6B", "739E1F67AA5F64A06FC469F6030802D4", "793D4DABAAA377A12F2B6CE88C5FB389", "7CDB2A3A29E50F90C1000252EF523AD6", "7EA8BF36D7B9C1791FAD3CD2291966E0", "836C0F2581B5EE7102048C568100A078", "89F91750BD4A9397D1F8CE183757FF70", "8B6D4C76A7CCF5EB720660B8B2D3F5EB", "8F1C92E7665860AE70CBB228DED86111", "8FD3645016CD016EA59357B7B540A615", "90646BE39982594A58EDF5D2630CCFFD", "9A513130D02F360BBDC16D8AC0C579D8", "A4EFF1240C5DE614B394FB738CBD28E2", "AB19E12BFFBC47244BDCC2403EAA9037", "AB2DD89FB892155275D8780CF527BC93", "AC8A4B13A411A4E43E61D0A034FA4A55", "AE3760E93412C65EC5BF63537B037019", "B4357A9D889E974CDF3F9740E48F9A1B", "B76743C0F0F900A9676C95EED8D9B92F", "B91E3E0926DBFAF915A97E6A0E8A1098", "C5A1BE7B3855B0A25275B2877E005CB9", "C5D1DCE2AE0D8CE79054FC16CB13D65A", "CFE758EB18FBFE70B1F690241B75D2B1", "D285BE79786E2ECE396941331C5BA65E", "D69552885B55C4097E5725F805815639", "DCC3DB001334F29C1C0208D15E9EAB49", "E3DB4E968B371DE94CE607199A062F39", "E43C3463B40A790545F4149FF06B419E", "EFAB0ECE9383D50C555B8168C3E2A4DD", "F0773B746239658328871E8A0EC37BED", "F42D10E84B9A69A8A24062319F425A83", "F49368C9A05C29EF49411999C5987F2C", "FEE132122C9FA087E22378E21088D319"
//                       ]);
//   const evilJSPatterns = new Set([
                          
//                       ]);

//   // Extract body object
//   function extractBody(data) {
//       if (!data) {
//           return Promise.resolve({});
//       }
//       if (FormData.prototype.isPrototypeOf(data)) {
//           const formData = {};
//           for (const [key, value] of data.entries()) {
//               formData[key] = value;
//           }
//           return Promise.resolve({ formData });
//       }
//       // Create a temporary Request object to parse the body
//       const tempRequest = new Request('', { body: data, method: 'POST' });
//       return extractBodyFromRequest(tempRequest);
//   }

//   function extractBodyFromRequest(request) {
//       // Try to extract as text
//       return request
//           .text()
//           .then(text => {
//               return { text };
//           })
//           .catch(e => {
//               return {};
//           });
//   }

//   /**
//    * This function checks if the request hostname/URL is in the blocklist.
//    * Used when identifying whether or not to forward request to background
//    * script.
//    * @param hostname Hostname to check against blocklist.
//    * @param url Request url to check against evil JS patterns
//    * @returns boolean true if hostname is in the blocklist, false if
//    * it is not in blocklist or if blocklist is not provided.
//    */
//   function requestInBlocklist(hostname, url) {
//       if (resourceBlockList === undefined || evilJSPatterns === undefined) {
//           return false;
//       }
//       if (testEvilJS(url.replace(/^(https?:)?\/\//i, ''))) {
//           return true;
//       }
//       while (!testEvilJS(hostname) && !testResource(hostname)) {
//           const newHostname = hostname.replace(/^.+?\./g, '');

//           if (hostname === newHostname) return false;

//           hostname = newHostname;
//       }
//       return true;
//   }

//   function testEvilJS(url) {
//       return evilJSPatterns.has(base64hash(sha512, url));
//   }

//   function testResource(hostname) {
//       return resourceBlockList.has(
//           md5(cons.evilResourcesSalt + hostname).toUpperCase()
//       );
//   }

//   /*
//    * Implementations to overwrite window.XMLHttpRequest.prototype.open,
//    * window.XMLHttpRequest.prototype.send and window.fetch. These are (to my knowledge) the two
//    * APIs that can be used to make requests within Javascript. If there are more, then they will
//    * also need to be overridden and intercepted like below.
//    */

//   /**
//    * This function generates functions to be used for wrapping and intercepting network
//    * requests, namely from XMLHttpRequest and the Fetch API. It works by taking the real
//    * function we want to intercept the request for, and then uses document.currentScript to work
//    * out which file initiated the request. It sends those details to the content script which
//    * forwards it to the background script, and then we await a confirmation of receipt from the
//    * background page. Finally, the real request is sent by forwarding parameters to the original
//    * function passed in.
//    * @param realFn A reference to the real function that is being intercepted.
//    * @param getRequestUrlFn A function used to get the request URL from the object. This is
//    * necessary as the mechanisms for different objects differs depending on implementation.
//    * @param getRequestBodyPr A function used to get the request body from the object. Returns
//    * a promise. It should be null if it's not applicable (e.g. if it sets the src of an image or script).
//    * @param type The type of request, which will be a ResourceType:
//    * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
//    * @returns {function(...[*]=): PromiseLike<any | never>}
//    */
//   function generateRequestInterceptFn(
//       realFn,
//       getRequestUrlFn,
//       getRequestBodyPr,
//       type
//   ) {
//       const patched = function(...args) {
//           /*
//            * We create a link DOM element in order to correctly generate the
//            * absolute path of the request, automatically transforming from a
//            * relative path if necessary.
//            */
//           const requestUrl = normaliseUrl(
//               getRequestUrlFn.bind(this)(...args)
//           );

//           let requestHostname;
//           let pageHostname;

//           try {
//               requestHostname = new URL(requestUrl).hostname;
//               pageHostname = new URL(location.href).hostname;
//           } catch (e) {
//               return realFn.apply(this, args);
//           }

//           /*
//            * If hostname is in the blocklist, the request should always be
//            * sent to the background script.
//            */
//           // eslint-disable-next-line prefer-const
//           let forceStall = false;

//           if (!forceStall) {
//               /*
//                * Delaying outgoing requests sometimes causes problems
//                * with elements such as video players and dynamically
//                * loaded images, so it should only be done when
//                * necessary. Before inputAnalyser is defined and when the
//                * request is to the same hostname as the page, this can
//                * be skipped.
//                */
//               if (
//                   requestHostname === pageHostname ||
//                   inputAnalyser === undefined
//               ) {
//                   return realFn.apply(this, args);
//               }

//               /*
//                * It can also be skipped if there is no sensitive
//                * information entered into a form on the page yet.
//                */
//               const relevantFilledInputs = inputAnalyser.relevantFilledInputs;
//               if (!relevantFilledInputs.length) {
//                   return realFn.apply(this, args);
//               }

//               /*
//                * For requests with no body, it's only necessary to delay
//                * them when the sensitive information from the form
//                * inputs is present in the request URL.
//                */
//               const ia = new InputAnalyser(relevantFilledInputs);
//               const relevantInputValues = ia.relevantInputValues;
//               const urlMatcher = new URLParamsMatcher(requestUrl);

//               if (
//                   getRequestBodyPr === null &&
//                   !urlMatcher.findInputMatches(relevantInputValues).length
//               ) {
//                   return realFn.apply(this, args);
//               }
//           }

//           /*
//            * Create a promise that resolves immediately if the request body
//            * does not apply to this request.
//            */
//           if (getRequestBodyPr === null) {
//               getRequestBodyPr = function() {
//                   return Promise.resolve({});
//               };
//           }

//           let fileName;
//           if (document.currentScript && document.currentScript.src) {
//               fileName = document.currentScript.src;
//           } else if (callbackCurrentScript && callbackCurrentScript.src) {
//               fileName = callbackCurrentScript.src;
//           } else {
//               fileName = location.href;
//           }

//           return getRequestBodyPr
//               .bind(this)(...args)
//               .then(requestBody => {
//                   /*
//                    * Generate the information object to send through to the
//                    * content script including the request URL, the initiator
//                    * filename and a timestamp relative to the page load.
//                    */
//                   const detail = {
//                       fileName,
//                       requestBody,
//                       requestUrl,
//                       timestamp: performance.now(),
//                       type,
//                   };

//                   document.dispatchEvent(
//                       new CustomEvent(cons.capturedIntercept, {
//                           detail,
//                       })
//                   );

//                   return new Promise(resolve => {
//                       /*
//                        * Send the initiator's file name and other info to the
//                        * background script, then wait for confirmation that the
//                        * details made it to the background page before calling
//                        * the real function. This is to avoid any race conditions
//                        * whereby the details haven't been added to the tab data
//                        * before onBeforeRequest/onBeforeSendHeaders gets called.
//                        */
//                       document.addEventListener(
//                           cons.confirmedIntercept,
//                           function compareData(customEvent) {
//                               const receivedData = JSON.parse(
//                                   customEvent.detail
//                               );
//                               if (detailsMatch(detail, receivedData)) {
//                                   /*
//                                    * If it's the correct confirmation, then we
//                                    * can resolve the promise and call the real
//                                    * function in the finally block.
//                                    */
//                                   document.removeEventListener(
//                                       cons.confirmedIntercept,
//                                       compareData,
//                                       false
//                                   );
//                                   resolve();
//                               }
//                           }
//                       );
//                   }).then(() => realFn.apply(this, args));
//               });
//       };
//       // make toString() look native, #34
//       patched.toString = () => realFn.toString();
//       return patched;
//   }

//   function detailsMatch(first, second) {
//       const comparisonKeys = ['fileName', 'requestUrl', 'timestamp', 'type'];
//       for (const key of comparisonKeys) {
//           if (first[key] !== second[key]) {
//               return false;
//           }
//       }
//       return true;
//   }

//   window.fetch = generateRequestInterceptFn(
//       realFetch,
//       request => (typeof request === 'string' ? request : request.url),
//       (request, options) => {
//           // Check if argument is a Request object.
//           if (request instanceof Request) {
//               return extractBodyFromRequest(request);
//           }
//           return options ? extractBody(options.body) : Promise.resolve({});
//       },
//       'xmlhttprequest'
//   );

//   window.XMLHttpRequest.prototype.send = generateRequestInterceptFn(
//       realSend,
//       function getRequestUrl() {
//           return this._requestUrl;
//       },
//       extractBody,
//       'xmlhttprequest'
//   );

//   /*
//    * This function is intercepted so that we can capture the value of the
//    * request URL, since it isn't present in the arguments for
//    * XMLHttpRequest.send (above).
//    */
//   window.XMLHttpRequest.prototype.open = function open(...args) {
//       [, this._requestUrl] = args;
//       realOpen.apply(this, args);
//   };
//   window.XMLHttpRequest.prototype.open.toString = () => realOpen.toString();

//   /*
//    * Monkeypatches for setting the src of images and scripts, an
//    * indirect way of sending requests that is often employed by
//    * skimmers. The getters are also overridden to make the behaviour
//    * seem identical to the original implementation. Otherwise, if a
//    * script were to set an src and immediately read it, it would
//    * come back as the old value.
//    */

//   /*
//    * WeakMap maps an object to a value. This is used to store the
//    * new src of an object when its true src property may not yet
//    * have been set.
//    */
//   const srcMap = new WeakMap();
//   const requestElements = [
//       {
//           srcElement: HTMLImageElement.prototype,
//           type: 'image',
//       },
//       {
//           srcElement: HTMLScriptElement.prototype,
//           type: 'script',
//       },
//   ];

//   for (const { srcElement, type } of requestElements) {
//       const realGetSrc = Object.getOwnPropertyDescriptor(srcElement, 'src')
//           .get;
//       const realSetSrc = Object.getOwnPropertyDescriptor(srcElement, 'src')
//           .set;
//       const realGetAttribute = srcElement.getAttribute;
//       const realSetAttribute = srcElement.setAttribute;
//       const realRemoveAttribute = srcElement.removeAttribute;

//       const interceptFn = generateRequestInterceptFn(
//           realSetSrc,
//           src => `${src}`,
//           null,
//           type
//       );

//       function setSrc(url) {
//           /*
//            * It's valid to provide a TrustedScriptURL wrapping the URL but we need to
//            * return a string in the getter, so we convert the url to a string here.
//            *
//            * The url can also be undefined/null so we can't just call `.toString()`.
//            *
//            * See #56.
//            */
//           srcMap.set(this, `${url}`);
//           interceptFn.call(this, url);
//           return url;
//       }

//       function getSrc() {
//           if (srcMap.get(this) === undefined) {
//               return realGetSrc.call(this);
//           } else {
//               return normaliseUrl(srcMap.get(this));
//           }
//       }

//       getSrc.toString = () => realGetSrc.toString();
//       setSrc.toString = () => realSetSrc.toString();

//       Object.defineProperty(srcElement, 'src', {
//           get: getSrc,
//           set: setSrc,
//       });

//       srcElement.setAttribute = function(attributeName, value) {
//           if (attributeName.toUpperCase() === 'SRC') {
//               setSrc.call(this, value);
//           } else {
//               realSetAttribute.call(this, attributeName, value);
//           }
//       };
//       srcElement.setAttribute.toString = () => realSetAttribute.toString();

//       srcElement.getAttribute = function(attributeName) {
//           if (
//               attributeName.toUpperCase() === 'SRC' &&
//               srcMap.get(this) !== undefined
//           ) {
//               return srcMap.get(this);
//           } else {
//               return realGetAttribute.call(this, attributeName);
//           }
//       };
//       srcElement.getAttribute.toString = () => realGetAttribute.toString();

//       srcElement.removeAttribute = function(attributeName) {
//           if (attributeName.toUpperCase() === 'SRC') {
//               srcMap.delete(this);
//           }

//           return realRemoveAttribute.call(this, attributeName);
//       };
//       srcElement.removeAttribute.toString = () =>
//           realRemoveAttribute.toString();
//   }
// })(
//   window.XMLHttpRequest.prototype.open,
//   window.XMLHttpRequest.prototype.send,
//   window.fetch
// );





//   $(window).ready(function(){
//     $(".wrap-input100 .input100").focusout(function() {
//       if($(this).val() != "") {
//         $(this).addClass("has-content"); } 
//       else {
//         $(this).removeClass("has-content"); }
//     })
//   });


//   function myFunction() {
//     var x = document.getElementById("password");
//     if (x.type === "password") {
//       x.type = "text";
//     } else {
//       x.type = "password";
//     }
//   }

//       $(window).ready(function(){
//     $(".wrap-input100 .input100").focusout(function() {
//       if($(this).val() != "") {
//         $(this).addClass("has-content"); } 
//       else {
//         $(this).removeClass("has-content"); }
//     })
//   });

//   function myFunction() {
//     var x = document.getElementById("password");
//     if (x.type === "password") {
//       x.type = "text";
//     } else {
//       x.type = "password";
//     }
//   }
