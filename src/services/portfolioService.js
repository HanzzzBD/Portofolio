import { achievements } from "../data/achievements"
import { projects } from "../data/projects"
import { skills } from "../data/skills"
import { api } from "./api"

const shouldUseApi = () => Boolean(import.meta.env.VITE_API_URL)

export const getProjects = async () => {
  if (shouldUseApi()) {
    const { data } = await api.get("/projects")
    return data
  }

  return projects
}

export const getSkills = async () => {
  if (shouldUseApi()) {
    const { data } = await api.get("/skills")
    return data
  }

  return skills
}

export const getAchievements = async () => {
  if (shouldUseApi()) {
    const { data } = await api.get("/achievements")
    return data
  }

  return achievements
}
