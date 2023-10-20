import Realm from 'realm';
import BookSchema from '../Schemas/BookSchema';

export default async function getRealm(){
    return await Realm.open({
        schema: [BookSchema]
    });
}