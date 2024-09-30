const LowerCase = require("./Lowercases");
const specials = require("./Specials");

/** @type {string} */
const word = "[^\\s'’\\(\\)!?;:\"-]";
const regex = new RegExp(
	`(?:(?:(\\s?(?:^|[.\\(\\)!?;:"-])\\s*)(${word}))|(${word}))(${word}*[’']*${word}*)`,
	"g",
);

/** @param {string[]} specials */
const convertToRegExp = (specials) =>
	specials.map((s) => [new RegExp(`\\b${s}\\b`, "gi"), s]);

/** @param {string} match */
function parseMatch(match) {
	const firstCharacter = match[0];

	// Test the first character
	if (/\s/.test(firstCharacter)) {
		// If it's a whitespace, trim it and return the rest
		return match.slice(1);
	}

	if (/[\(\)]/.test(firstCharacter)) {
		// If it's a bracket, don't replace it.
		return null;
	}

	return match;
}

/**
 * @param {string} text 
 * @param {{ custom_specials?: string[] }} options */
module.exports = function Capitalise(
	text,
	options = {},
) {
	text = text
		.toLowerCase()
		.replace(regex, (m, lead = "", forced, lower, rest, offset, string) => {
			const isLastWord = m.length + offset >= string.length;

			const parsedMatch = parseMatch(m);
			if (!parsedMatch) {
				return m;
			}

			if (!forced) {
				const fullLower = lower + rest;

				if (LowerCase.has(fullLower) && !isLastWord) {
					return parsedMatch;
				}
			}

			return lead + (lower || forced).toUpperCase() + rest;
		});

	const customSpecials = options.custom_specials || [];
	const replace = [...specials, ...customSpecials];
	const replaceRegExp = convertToRegExp(replace);

	replaceRegExp.forEach(([pattern, s]) => {
		text = text.replace(pattern, s);
	});

	return text;
}