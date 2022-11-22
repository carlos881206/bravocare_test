export const calcOverlap = (start1, end1, start2, end2) => {
    const overlap = Math.min(end1.getTime(), end2.getTime()) - Math.max(start1.getTime(), start2.getTime());
    return overlap > 0 ? overlap / 1000 / 60 : 0;
};
