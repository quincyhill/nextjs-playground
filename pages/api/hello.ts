import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'hello' })

  // An example for use would be handling form input here and save this info to the database

  // Also do not fetch an API route from getStaticProps or getStaticPaths
}
