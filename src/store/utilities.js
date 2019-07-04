export const updateObject = (oldObject, updates) => {
    return {
        ...oldObject,
        ...updates
    }
};

export default updateObject;