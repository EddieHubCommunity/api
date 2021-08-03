const stringRegex = new RegExp(/(.*?)/);
const documentId = new RegExp(/[\S]{8}-[\S]{4}-[\S]{4}-[\S]{4}-[\S]{12}/);
const numberRegex = new RegExp(/[0-9]+/);
const dateRegex = new RegExp(
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
);
const jwt = new RegExp(
  /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
);
const versionRegex = new RegExp(
  /Currently running version: \d{1,3}.\d{1,3}.\d{1,3}/,
);
const v4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
);

export function getRegex(type: string): RegExp {
  switch (type) {
    case 'TYPE:ID':
      return documentId;

    case 'TYPE:STRING':
      return stringRegex;

    case 'TYPE:NUMBER':
      return numberRegex;

    case 'TYPE:DATE':
      return dateRegex;
    case 'TYPE:VERSION':
      return versionRegex;
    case 'TYPE:JWT':
      return jwt;
    case 'TYPE:UUID':
      return v4;
    default:
      break;
  }
}
