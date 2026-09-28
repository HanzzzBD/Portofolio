import { achievements } from "../data/achievements"
import { projects } from "../data/projects"
import { skills } from "../data/skills"
import { api } from "./api"

const shouldUseApi = () => Boolean(import.meta.env.VITE_API_URL)

export const hasPortfolioApi = () => shouldUseApi()

export const getProjectsSnapshot = () => (shouldUseApi() ? [] : projects)

export const getSkillsSnapshot = () => (shouldUseApi() ? [] : skills)

export const getAchievementsSnapshot = () => (shouldUseApi() ? [] : achievements)

export const getProjects = async () => {
  if (shouldUseApi()) {
    const { data } = await api.get("/projects")
    return data
  }

  return getProjectsSnapshot()
}

export const getSkills = async () => {
  if (shouldUseApi()) {
    const { data } = await api.get("/skills")
    return data
  }

  return getSkillsSnapshot()
}

export const getAchievements = async () => {
  if (shouldUseApi()) {
    const { data } = await api.get("/achievements")
    return data
  }

  return getAchievementsSnapshot()
}
