import Ad from '@component/Ad'
import Callout from '@component/Callout'
import Content from '@component/Content'

export default function Page() {
  return (
    <>
      <Content>
        <h1>Code Examples and Guides on Functionality with Alpine JS</h1>

        <p>
          Alpine JS allows you to write DOM manipulation all in your HTML,
          Liquid, Blade etc. This website serves as a collection of examples of
          functionality that you may have to build in your next project.
        </p>

        <p>
          I have kept the styling to a minimum so that you can focus on the
          functionality.
        </p>

        <Callout>
          This is a new version of the website with a change in direction for
          content. Please be patient while I expand on the content.
        </Callout>

        <Ad
          adType="image"
          adClass="bordered horizontal mt-4"
          adId="home-page"
        />
      </Content>
    </>
  )
}
