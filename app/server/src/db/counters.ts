import { Collection, Db } from 'mongodb';

let c: Collection;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initCounters (db: Db) {
  c = db.collection ('counters');
}

/**
 * Update counter (increment) and return new counter
 * @param _id Counter name
 * @returns New counter value
 */
export async function getNextSequence (_id: string): Promise<number | undefined> {
  const t = await c.findOneAndUpdate (
    { _id },
    { $inc: { sequence: 1 } },
    { returnDocument: 'after', upsert: true },
  );
  return t?.value?.sequence;
}
