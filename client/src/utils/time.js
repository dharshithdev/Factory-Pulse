export const getRelativeTime = (date) => {

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    if (seconds < 60) {

        return `${seconds} sec ago`;

    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {

        return `${minutes} min ago`;

    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {

        return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    }

    const days = Math.floor(hours / 24);

    if (days === 1) {

        return "Yesterday";

    }

    if (days < 7) {

        return `${days} days ago`;

    }

    return new Date(date).toLocaleDateString();

};