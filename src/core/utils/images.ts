import { IMAGE_BASE_URL, ORIGINAL_IMAGE_BASE_URL } from '@/core';

export const getBackdropUrl = (fileName: string) => `${ORIGINAL_IMAGE_BASE_URL}${fileName}`;

export const getImageUrl = (fileName: string) => `${IMAGE_BASE_URL}${fileName}`;

