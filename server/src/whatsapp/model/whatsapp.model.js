import path from "path";
import fs from "fs";
import pool from "../../shared/model/mysql-pool.js";
import { sessionsFolderPath } from "../constants/dir.js";
import { existsInActiveSessions } from "../lib/activeSessions.js";

export const deleteLineFolder = (cliendId) => {
  return fs.rmSync(path.join(sessionsFolderPath, `session-${cliendId}`),{recursive :true,force : true});
};
export const getGeneratedLines = () => {
  const avaiableSessions = fs.readdirSync(sessionsFolderPath);
  return avaiableSessions.map((clientId) => clientId.replace("session-", ""));
};

export const getAvailableLinesFromFolders = () => {
  const avaiableSessions = getGeneratedLines();
  const availableLines =  avaiableSessions.map(clientId => {
  const isActive = existsInActiveSessions(clientId)
    return {
      isActive,
      clientId
    }
  })
  return availableLines
}

export const getMessageGroupDb = async (groupId) => {
  /*Convertir a transaction */
  const [messages] = await pool.query(
    `SELECT * from Messages where ID_MESSAGE_GROUP = ? ORDER BY ID_MESSAGE ASC`,
    [groupId]
  );
  const [group] = await pool.query(
    `SELECT * from MessageGroups where ID_MESSAGE_GROUP = ?`,
    [groupId]
  );

  return { ...group[0], messages };
};
export const getMessageGroupsDb = async () => {
  const [messageGroups] = await pool.query(
    `SELECT ID_MESSAGE_GROUP,NAME,CREATED_BY from MessageGroups`
  );
  return messageGroups;
};

export const insertNewMessageGroupDb = async (newMessageGroupName) => {
  const response = await pool.query(
    `INSERT INTO MessageGroups( NAME,CREATED_BY) VALUES (?,1)`,
    [newMessageGroupName]
  );

  return response;
};
export const deleteMessageGroupDb = async (ID_GROUP_MESSAGE) => {
  const response = await pool.query(
    `DELETE FROM MessageGroups WHERE ID_MESSAGE_GROUP = ?`,
    [ID_GROUP_MESSAGE]
  );
  return response;
};

export const updateMessagesGroupDb = async (messages, groupId) => {
  const formatedMessages = messages.map((message) => [message.TEXT,message.ES_MULTIMEDIA, groupId]);

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(`DELETE FROM Messages where ID_MESSAGE_GROUP = ?`, [
      groupId,
    ]);

    await connection.query(
      `INSERT INTO Messages (TEXT,ES_MULTIMEDIA,ID_MESSAGE_GROUP) VALUES ?`,
      [formatedMessages]
    );

    await connection.commit();
  } catch (error) {
    const rollback = await connection.rollback();
    console.log({ rollback });
    throw error;
  } finally {
    connection.release();
  }
};
