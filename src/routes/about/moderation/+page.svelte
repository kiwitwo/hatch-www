<script>
  import ProjectRating from "$lib/components/ProjectRating.svelte";
</script>

<h1>Guide to Moderation</h1>
<p>This page provides detailed information about how moderation is done on the Hatch website.</p>
<h2 id="project-ratings">Project Ratings</h2>
<p>
  All projects on Hatch are subject to receiving an age rating. These are provided manually by the
  Hatch Team. The system is not automatic.
</p>
<table>
  <tbody>
    <tr>
      <td>
        <ProjectRating rating="N/A" />
      </td>
      <td>
        This project has not been rated yet. Only visitors who are logged in can view this project.
        Please report inappropriate projects.
      </td>
    </tr>
    <tr>
      <td>
        <ProjectRating rating="E" />
      </td>
      <td>
        This project is suitable for all audiences. This project contains little to no violence
        and/or language.
      </td>
    </tr>
    <tr>
      <td>
        <ProjectRating rating="7+" />
      </td>
      <td>
        This project is suitable for most audiences. This project contains little to no violence
        and/or language, and may receive an NFE rating on Scratch.
      </td>
    </tr>
    <tr>
      <td>
        <ProjectRating rating="9+" />
      </td>
      <td>
        This project is suitable for some audiences. This project may contain some violence,
        cartoonish blood, light profanity, and scares, and would likely receive an NFE rating on
        Scratch.
      </td>
    </tr>
    <tr>
      <td>
        <ProjectRating rating="13+" />
      </td>
      <td>
        This project only suitable for teenagers. This project may contain intense violence, blood,
        profanity, scares, and moderate suggestive content, and would be taken down on Scratch.
      </td>
    </tr>
  </tbody>
</table>
