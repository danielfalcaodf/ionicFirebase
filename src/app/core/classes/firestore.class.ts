import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';

export abstract class Firestore<T extends { id: string }> {

    protected  collection: AngularFirestoreCollection<T>;
    constructor(protected db: AngularFirestore) {

    }

    setCollection(path: string, queryFn?: QueryFn): void {
        this.collection = path ? this.db.collection<T>(path, queryFn) : null;
        console.log(path);
    }
    private setItem(item: T, operation: 'set' | 'update'): Promise<T> {
        return this.collection
            .doc<T>(item.id)
        [operation](item)
            .then(() => item)

    }
    getAll(): Observable<T[]> {
        
        console.log("teste");
        return this.collection.valueChanges();
    }

    get(id: string): Observable<T> {
        return this.collection.doc<T>(id).valueChanges();
    }

    create(item: T): Promise<T> {
        item.id = this.db.createId();
        return this.setItem(item, 'set')
    }
    update(item: T): Promise<T> {
        return this.setItem(item, 'update');
    }
    delete(item: T): Promise<void> {
        return this.collection.doc(item.id).delete();
    }

}
