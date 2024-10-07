import {isAxiosError} from 'axios';

import {Errors} from '../../enums/errors';

export const getApiOrUnknownErrorMessage = (error: unknown): string =>
  isAxiosError(error)
    ? error.response?.data?.message ?? Errors.UNKNOWN
    : Errors.UNKNOWN;
