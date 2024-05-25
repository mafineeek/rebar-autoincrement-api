import {useRebar} from '@Server/index.js';
import {useApi} from '@Server/api/index.js';

const COLLECTION_NAME = 'AutoIncrementStore';

interface AutoIncrement {
    _id?: string;
    collectionName: string;
    nextId: number;
}

const database = useRebar().database.useDatabase();

export const useAutoIncrement = () => {
    const getNextIdForCollection = async (collectionName: string) => {
        let result = await database.get<AutoIncrement>({collectionName}, COLLECTION_NAME);

        if (!result) {
            const newEntry = {collectionName, nextId: 1};
            const newId = await database.create(newEntry, COLLECTION_NAME);
            return newEntry.nextId;
        }

        result.nextId += 1;
        await database.update<Partial<AutoIncrement>>({_id: result._id, nextId: result.nextId}, COLLECTION_NAME);

        return result.nextId;
    }

    return {
        getNextIdForCollection
    }
}

declare global {
    export interface ServerPlugin {
        ['autoincrement-api']: ReturnType<typeof useAutoIncrement>;
    }
}

useApi().register('autoincrement-api', useAutoIncrement());
