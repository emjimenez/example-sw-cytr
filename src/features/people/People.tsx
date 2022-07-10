import React from 'react';
import styles from './People.module.css';
import { useGetAllPeopleQuery } from './../../services/sw'

export function People() {
  const { data, error, isLoading } = useGetAllPeopleQuery()
  return (
    <div className={styles.people}>
      <h1 className="text-3xl mb-6">Characters</h1>
      {isLoading && <p>Loading</p>}
      {error && <p>Something went wrong</p>}
      {data && data.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
}
