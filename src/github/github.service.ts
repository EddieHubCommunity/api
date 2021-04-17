import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GithubProfile } from './interfaces/github.interface';
import { GithubDTO } from './dto/github.dto';

@Injectable()
export class GithubService {
  private githubProfiles: Array<GithubProfile> = [];

  createGithub(body: GithubDTO): GithubProfile {
    const newGithubProfile: GithubProfile = {
      id: 123,
      username: body.username,
      avatarUrl: body.avatarUrl,
      bio: body.bio,
      communityStats: body.communityStats,
      followers: body.followers,
      repos: body.repos,
      createdOn: new Date('2021-01-01T00:00:00.000Z'),
      updatedOn: new Date('2021-01-01T00:00:00.000Z'),
    };

    if (!newGithubProfile.username) {
      throw new HttpException('Incomplete Data', HttpStatus.BAD_REQUEST);
    }
    this.githubProfiles.push(newGithubProfile);

    return newGithubProfile;
  }

  findAll(): GithubProfile[] {
    return [...this.githubProfiles];
  }

  findOne(id: number): GithubProfile {
    const githubProfile = this.githubProfiles.find((user) => user.id === id);
    if (!githubProfile) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...githubProfile };
  }

  update(id: number, updateDiscordDto: GithubDTO): GithubProfile {
    const {
      username,
      bio,
      avatarUrl,
      repos,
      communityStats,
      followers,
    } = updateDiscordDto;
    const githubProfile = this.githubProfiles.find(
      (profile) => profile.id === id,
    );
    if (!githubProfile) {
      throw new HttpException('Githubprofile Not Found', HttpStatus.NOT_FOUND);
    }
    const updateGithubProfile = { ...githubProfile };
    if (username) {
      updateGithubProfile.username = username;
    }
    if (bio) {
      updateGithubProfile.bio = bio;
    }
    if (avatarUrl) {
      updateGithubProfile.avatarUrl = avatarUrl;
    }
    if (repos) {
      updateGithubProfile.repos = repos;
    }
    if (communityStats) {
      updateGithubProfile.communityStats = communityStats;
    }
    if (followers) {
      updateGithubProfile.followers = followers;
    }

    const index = this.githubProfiles.findIndex(
      (discordUser) => discordUser.id === id,
    );
    this.githubProfiles[index] = updateGithubProfile;

    return updateGithubProfile;
  }

  remove(id: number) {
    const deleteElement = this.githubProfiles.find(
      (profile) => profile.id == id,
    );
    if (!deleteElement) {
      throw new HttpException('Githubprofile Not Found', HttpStatus.NOT_FOUND);
    }
    const updateProfile = this.githubProfiles.filter((user) => user.id !== id);
    this.githubProfiles = [...updateProfile];

    return {};
  }
}
