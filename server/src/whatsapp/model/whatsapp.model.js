import path from "path";
import fs from "fs";
import pool from "../../shared/model/mysql-pool.js";
import { sessionsFolderPath } from "../constants/dir.js";
import { existsInActiveSessions } from "../lib/activeSessions.js";

export const deleteLineFolder = (cliendId) => {
  return fs.rmSync(path.join(sessionsFolderPath, `session-${cliendId}`), {
    recursive: true,
    force: true,
  });
};
export const getGeneratedLines = () => {
  const avaiableSessions = fs.readdirSync(sessionsFolderPath);
  return avaiableSessions.map((clientId) => clientId.replace("session-", ""));
};

export const getAvailableLinesFromFolders = () => {
  const avaiableSessions = getGeneratedLines();
  const availableLines = avaiableSessions.map((clientId) => {
    const isActive = existsInActiveSessions(clientId);
    return {
      isActive,
      clientId,
    };
  });
  return availableLines;
};

export const getMessageGroupDb = async (groupId) => {
  /*Convertir a transaction */
  const [messages] = await pool.query(
    `SELECT * from Messages where ID_MESSAGE_GROUP = ? AND IS_DELETED = 0 ORDER BY ID_MESSAGE ASC`,
    [groupId]
  );
  const [group] = await pool.query(
    `SELECT * from MessageGroups where ID_MESSAGE_GROUP = ? AND IS_DELETED = 0`,
    [groupId]
  );

  return { ...group[0], messages };
};
export const getMessageGroupsDb = async () => {
  const [messageGroups] = await pool.query(
    `SELECT ID_MESSAGE_GROUP,NAME,CREATED_BY from MessageGroups where IS_DELETED = 0`
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
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [response] = await connection.query(
      `UPDATE  MessageGroups set IS_DELETED = 1 WHERE ID_MESSAGE_GROUP = ?`,
      [ID_GROUP_MESSAGE]
    );
    await connection.query(
      `UPDATE Messages set IS_DELETED = 1 WHERE ID_MESSAGE_GROUP = ?`,
      [ID_GROUP_MESSAGE]
    );

    await connection.commit();
    return response;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const updateMessagesGroupDb = async (messages, groupId) => {
  const formatedMessages = messages.map((message) => [
    message.TEXT,
    message.ES_MULTIMEDIA,
    message.IS_CONTACT,
    message.IS_DELETED,
    message.ID_MESSAGE,
    
    groupId,
  ]);

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [response] = await connection.query(
      `
    INSERT INTO Messages (TEXT,ES_MULTIMEDIA,IS_CONTACT,IS_DELETED,ID_MESSAGE,ID_MESSAGE_GROUP) 
    VALUES ?  ON DUPLICATE KEY UPDATE 
    TEXT = VALUES(TEXT),
    ES_MULTIMEDIA = VALUES(ES_MULTIMEDIA),
    IS_DELETED = VALUES(IS_DELETED),
    IS_CONTACT = VALUES(IS_CONTACT)`,
      [formatedMessages]
    );

    await connection.commit();
    return response;
  } catch (error) {
    const rollback = await connection.rollback();
    console.log({ rollback });
    throw error;
  } finally {
    connection.release();
  }
};
