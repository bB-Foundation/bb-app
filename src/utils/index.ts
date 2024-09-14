import {isAxiosError} from 'axios';

import {Errors} from '../shared/errors';

export const getApiOrUnknownErrorMessage = (error: unknown): string =>
  isAxiosError(error)
    ? error.response?.data?.message ?? Errors.UNKNOWN
    : Errors.UNKNOWN;
